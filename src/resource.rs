use crate as bjs;
use bevy::{prelude::*, tasks::IoTaskPool};
use bjs::{futures::channel::oneshot, v8};
use std::{cell::RefCell, marker::PhantomData, rc::Rc};

pub struct JsRuntimeResource<R> {
    // Refactor to Option
    runtime: Rc<RefCell<bjs::JsRuntime>>,
    _phantom: PhantomData<R>,
}

impl<R: bjs::IntoRuntime> FromWorld for JsRuntimeResource<R> {
    fn from_world(world: &mut World) -> Self {
        let resource = world
            .non_send_resource::<bjs::WorldResourceExt>()
            .inner()
            .clone();

        let runtime = resource.lend(world, || R::into_runtime(resource.clone()));

        Self {
            runtime: Rc::new(RefCell::new(runtime)),
            _phantom: PhantomData::default(),
        }
    }
}

impl<R> JsRuntimeResource<R> {
    /// Executes a script on the [JsRuntime](bjs::JsRuntime)
    ///
    /// # Safety
    ///
    /// Script must be executed in the context of a Bevy world
    pub fn execute_script(
        &self,
        name: &str,
        source_code: &str,
    ) -> Result<v8::Global<v8::Value>, bjs::AnyError> {
        self.runtime.borrow_mut().execute_script(name, source_code)
    }

    /// Executes a module on the [JsRuntime](bjs::JsRuntime)
    ///
    /// Module is executed by calling [JsRuntimeResource::poll_runtime]
    #[allow(clippy::await_holding_refcell_ref)]
    pub fn execute_module(
        &self,
        specifier: bjs::ModuleSpecifier,
        source_code: Option<String>,
    ) -> oneshot::Receiver<Result<(), bjs::AnyError>> {
        let (sender, receiver) = oneshot::channel();

        let runtime = self.runtime.clone();
        IoTaskPool::get()
            .spawn_local(async move {
                // Module will be evaluated by [drive_runtime]
                match runtime
                    .borrow_mut()
                    .load_module(&specifier, source_code)
                    .await
                {
                    Ok(_) => {
                        info!("Loaded module: {}", specifier);
                        let _ = sender.send(Ok(()));
                    }
                    Err(err) => {
                        error!("Could not load module: {}", specifier);
                        error!("{}", err);
                        let _ = sender.send(Err(err));
                    }
                }
            })
            .detach();

        receiver
    }

    /// Polls the event loop of the [JsRuntime](bjs::JsRuntime)
    ///
    /// # Safety
    ///
    /// Event loop must be polled in the context of a Bevy world
    pub fn poll_runtime(&self) {
        let mut runtime = match self.runtime.try_borrow_mut() {
            Ok(runtime) => runtime,
            Err(_) => return,
        };

        match runtime.pending_mod_evaluate.take() {
            Some(module_id) => {
                let receiver = runtime.execute_module(module_id);

                // Spawn monitoring task to inform user about module execution state
                IoTaskPool::get()
                    .spawn_local(async move {
                        match receiver.await {
                            Ok(Err(err)) => {
                                error!("{}", err)
                            }
                            Err(_canceled) => {
                                error!("{}", bjs::AnyError::msg("Module evaluation was canceled"))
                            }
                            _ => {}
                        }
                    })
                    .detach();
            }
            None => runtime.poll_runtime(),
        }
    }
}

impl<R> Clone for JsRuntimeResource<R> {
    fn clone(&self) -> Self {
        Self {
            runtime: self.runtime.clone(),
            _phantom: self._phantom,
        }
    }
}

#[cfg(feature = "inspector")]
impl<R> JsRuntimeResource<R> {
    /// Returns [InspectorInfo](bjs::inspector::InspectorInfo) necessary to
    /// register the inspector with the [JsRuntime]
    pub fn inspector(
        &self,
        name: String,
        host: std::net::SocketAddr,
    ) -> bjs::inspector::InspectorInfo {
        self.runtime.borrow_mut().inspector(name, host)
    }

    /// Registers inspector with the [JsRuntime]
    pub fn register_inspector(&self, meta: &bjs::inspector::InspectorMeta) {
        let name = std::any::type_name::<R>().to_string();
        self.runtime.borrow_mut().register_inspector(name, meta);
    }
}

/// Drives a [JsRuntime] contained within a [JsRuntimeResource]
pub fn drive_runtime<R: 'static>(world: &mut World) {
    let resource = world
        .non_send_resource::<bjs::WorldResourceExt>()
        .inner()
        .clone();

    let runtime = world.non_send_resource::<JsRuntimeResource<R>>().clone();

    // Lend [World] reference to the resource and execute the Deno event loop
    // within the scope
    resource.lend(world, || runtime.poll_runtime());
}
