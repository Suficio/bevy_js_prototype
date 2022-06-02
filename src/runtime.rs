use crate::{
    self as bjs,
    anyhow::{anyhow, Error as AnyError},
    deno_core as dc,
    futures::{channel::oneshot, future},
    v8,
};
use bevy::{
    prelude::*,
    tasks::{ComputeTaskPool, IoTaskPool},
};
use std::{cell::RefCell, rc::Rc, task::Poll};

/// Represents a trait used to construct [JsRuntimes](bjs::JsRuntime) in a way
/// that is user configurable
pub trait IntoRuntime {
    /// Returns the options used to setup the [JsRuntime](bjs::JsRuntime)
    ///
    /// Takes [IoTaskPool] in order to allow the runtime to register monitoring
    /// tasks such as file watching for hot-reloading.
    fn runtime() -> JsRuntime;
}

pub struct JsRuntime {
    deno: Rc<RefCell<dc::JsRuntime>>,
}

impl JsRuntime {
    pub fn new(options: bjs::RuntimeOptions) -> Self {
        Self {
            deno: Rc::new(RefCell::new(dc::JsRuntime::new(options))),
        }
    }

    pub fn execute_script(
        &mut self,
        name: &str,
        source_code: &str,
    ) -> Result<v8::Global<v8::Value>, AnyError> {
        self.deno.borrow_mut().execute_script(name, source_code)
    }

    pub fn execute_module(
        &self,
        tp_io: &IoTaskPool,
        specifier: bjs::ModuleSpecifier,
        source_code: Option<String>,
    ) -> oneshot::Receiver<Result<(), AnyError>> {
        let (sender, receiver) = oneshot::channel();

        let deno = self.deno.clone();
        let t_tp_io = tp_io.clone();

        tp_io
            .spawn_local(async move {
                let mut deno = match deno.try_borrow_mut() {
                    Ok(deno) => deno,
                    Err(_) => {
                        return sender
                            .send(Err(anyhow!("Could not borrow Deno runtime")))
                            .expect("Module execution result receiving end dropped A")
                    }
                };

                let module_id = match deno.load_main_module(&specifier, source_code).await {
                    Ok(mid) => mid,
                    Err(err) => {
                        println!("Could not load module {} due to {}", &specifier, &err);
                        return sender
                            .send(Err(err))
                            .expect("Module execution result receiving end dropped B");
                    }
                };

                println!("Loaded module {}", &specifier);

                // Spawn seperate task to pipe result so that we do not hold
                // the borrow on `deno`.
                let recv = deno.mod_evaluate(module_id);
                t_tp_io
                    .spawn(async move {
                        // Receive socket may be dropped as user is not
                        // listening to the final result of the module.
                        let _ = match recv.await {
                            Ok(res) => sender.send(res),
                            Err(_) => sender.send(Err(anyhow!("Module evaluation was cancelled"))),
                        };
                    })
                    .detach();
            })
            .detach();

        receiver
    }

    pub fn builder() -> crate::JsRuntimeBuilder {
        crate::JsRuntimeBuilder::default()
    }
}

pub struct JsRuntimeResource {
    world: Rc<bjs::JsWorld>,
    runtimes: Vec<JsRuntime>,
}

impl FromWorld for JsRuntimeResource {
    fn from_world(_world: &mut World) -> Self {
        // let tp = world
        //     .get_resource::<ComputeTaskPool>()
        //     .expect("ComputeTaskPool was not initialized");

        Self {
            world: Rc::new(bjs::JsWorld::default()),
            runtimes: Vec::default(),
        }
    }
}

impl JsRuntimeResource {
    pub fn insert_runtime(&mut self, runtime: JsRuntime) {
        // Register [JsRuntimeWorld] with the runtime so Bevy specific ops can
        // have access to the [World].
        runtime
            .deno
            .try_borrow_mut()
            .expect("Runtime was borrowed when inserting runtime")
            .op_state()
            .borrow_mut()
            .resource_table
            .add_rc(self.world.clone());

        self.runtimes.push(runtime);
    }

    pub fn init_runtime<T>(&mut self)
    where
        T: IntoRuntime,
    {
        self.insert_runtime(T::runtime())
    }

    pub fn execute_script(
        &mut self,
        name: &str,
        source_code: &str,
    ) -> Result<v8::Global<v8::Value>, AnyError> {
        // TODO: This could potentially be removed with NonSendComponents
        let runtime = &mut self.runtimes[0];
        runtime.execute_script(name, source_code)
    }

    pub fn execute_module(
        &mut self,
        tp_io: &IoTaskPool,
        specifier: bjs::ModuleSpecifier,
        source_code: Option<String>,
    ) -> oneshot::Receiver<Result<(), AnyError>> {
        // TODO: This could potentially be removed with NonSendComponents
        let runtime = &mut self.runtimes[0];
        runtime.execute_module(tp_io, specifier, source_code)
    }
}

pub(crate) fn drive_runtimes(res: NonSendMut<JsRuntimeResource>, tp_c: Res<ComputeTaskPool>) {
    // Handle pending system registrations
    for sender in res.world.pending_registrations.borrow_mut().drain(..) {
        // TODO: Instantiate resource for each SystemParam collection
        sender
            .send(1)
            .expect("Could not instantiate system resource due to receiver being dropped");
    }

    for runtime in &res.runtimes {
        let deno = runtime.deno.clone();

        tp_c.spawn_local(future::poll_fn::<(), _>(move |cx| {
            // Borrow can be held while loading modules
            let mut deno = match deno.try_borrow_mut() {
                Ok(deno) => deno,
                Err(_) => return Poll::Ready(()),
            };

            match deno.poll_event_loop(cx, false) {
                // Keep event loop alive
                Poll::Ready(Err(err)) => {
                    println!("{}", err)
                }
                _ => {}
            };

            Poll::Ready(())
        }))
        .detach();
    }
}
