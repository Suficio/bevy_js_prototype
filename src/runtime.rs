use crate::{
    self as bjs,
    anyhow::{anyhow, Error as AnyError},
    deno_core as dc,
    futures::{channel::oneshot, executor, future},
    v8,
};
use bevy::{prelude::*, tasks::IoTaskPool, utils::Uuid};
use std::{cell::RefCell, marker::PhantomData, net::SocketAddr, rc::Rc, task::Poll};

/// Represents a trait used to construct [JsRuntimes](bjs::JsRuntime) in a way
/// that is user configurable
pub trait IntoRuntime {
    /// Returns the options used to setup the [JsRuntime](bjs::JsRuntime)
    ///
    /// Takes [IoTaskPool] in order to allow the runtime to register monitoring
    /// tasks such as file watching for hot-reloading.
    fn runtime(world: &mut World) -> JsRuntime;
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

    pub fn inspector(
        &self,
        specifier: bjs::ModuleSpecifier,
        host: SocketAddr,
    ) -> bjs::inspector::InspectorInfo {
        let mut inspector = self.deno.borrow_mut();
        let inspector = inspector.inspector();
        crate::inspector::InspectorInfo::new(
            host,
            Uuid::new_v4(),
            specifier.clone(),
            inspector.get_session_sender(),
            inspector.add_deregister_handler(),
            true,
        )
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
        specifier: bjs::ModuleSpecifier,
        source_code: Option<String>,
    ) -> oneshot::Receiver<Result<(), AnyError>> {
        let (sender, receiver) = oneshot::channel();

        let deno = self.deno.clone();

        IoTaskPool::get()
            .spawn_local(async move {
                let mut deno = match deno.try_borrow_mut() {
                    Ok(deno) => deno,
                    Err(_) => {
                        let err = anyhow!("Could not borrow Deno runtime");
                        error!("{}", err);
                        return sender
                            .send(Err(err))
                            .expect("Module execution result receiving end dropped A");
                    }
                };

                let module_id = match deno.load_main_module(&specifier, source_code).await {
                    Ok(mid) => mid,
                    Err(err) => {
                        error!("Could not load module {}", &specifier);
                        error!("{}", err);
                        return sender
                            .send(Err(err))
                            .expect("Module execution result receiving end dropped");
                    }
                };

                info!("Loaded module {}", &specifier);

                // Spawn seperate task to pipe result so that we do not hold
                // the borrow on `deno`.
                let recv = deno.mod_evaluate(module_id);
                IoTaskPool::get()
                    .spawn(async move {
                        // Receive socket may be dropped as user is not
                        // listening to the final result of the module.
                        let _ = match recv.await {
                            Ok(res) => {
                                if let Err(err) = &res {
                                    error!("{}", err);
                                }
                                sender.send(res)
                            }
                            Err(_canceled) => {
                                let err = anyhow!("Module evaluation was cancelled");
                                error!("{}", err);
                                sender.send(Err(err))
                            }
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

pub struct JsRuntimeResource<R> {
    bevy: Rc<bjs::BevyResource>,
    runtime: JsRuntime,
    _phantom: PhantomData<R>,
}

impl<R: IntoRuntime> FromWorld for JsRuntimeResource<R> {
    fn from_world(world: &mut World) -> Self {
        let bevy = Rc::new(bjs::BevyResource::default());
        let runtime = R::runtime(world);

        // Register [JsRuntimeWorld] with the runtime so Bevy specific ops can
        // have access to the [World].
        runtime
            .deno
            .try_borrow_mut()
            .expect("Runtime was borrowed when inserting runtime")
            .op_state()
            .borrow_mut()
            .resource_table
            .add_rc(bevy.clone());

        Self {
            bevy,
            runtime,
            _phantom: PhantomData::default(),
        }
    }
}

impl<R> JsRuntimeResource<R> {
    pub fn register_inspector(
        &self,
        specifier: bjs::ModuleSpecifier,
        meta: &bjs::inspector::InspectorMeta,
    ) {
        let info = self.runtime.inspector(specifier, meta.host);
        meta.register_inspector_tx
            .unbounded_send(info)
            .expect("Inspector server was dropped");
    }

    pub fn execute_script(
        &mut self,
        name: &str,
        source_code: &str,
    ) -> Result<v8::Global<v8::Value>, AnyError> {
        self.runtime.execute_script(name, source_code)
    }

    pub fn execute_module(
        &mut self,
        specifier: bjs::ModuleSpecifier,
        source_code: Option<String>,
    ) -> oneshot::Receiver<Result<(), AnyError>> {
        self.runtime.execute_module(specifier, source_code)
    }
}

pub fn drive_runtime<R: IntoRuntime + 'static>(world: &mut World) {
    let res = world
        .get_non_send_resource::<JsRuntimeResource<R>>()
        .unwrap();

    let deno = res.runtime.deno.clone();
    let bevy = res.bevy.clone();

    // Lend [Commands] reference to the resource
    bevy.lend(world, || {
        // Drive runtime
        executor::block_on(future::poll_fn(move |cx| {
            let mut deno = match deno.try_borrow_mut() {
                Ok(deno) => deno,
                Err(_) => return Poll::Ready(()),
            };

            match deno.poll_event_loop(cx, false) {
                // Keep event loop alive
                Poll::Ready(Err(err)) => {
                    error!("{}", err)
                }
                _ => {}
            };

            Poll::Ready(())
        }));
    });
}
