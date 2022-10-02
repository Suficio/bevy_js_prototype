use crate::{self as bjs};
use bevy::{prelude::*, tasks::IoTaskPool};
use bjs::{deno_core as dc, futures::channel::oneshot, v8};
use std::{cell::RefCell, rc::Rc};

/// Trait used to construct [JsRuntimes](bjs::JsRuntime)
pub trait IntoRuntime {
    fn into_runtime(resource: Rc<bjs::WorldResource>) -> JsRuntime;
}

pub struct JsRuntime {
    pub(crate) deno: Rc<RefCell<dc::JsRuntime>>,
}

impl JsRuntime {
    /// Creates a new [JsRuntime] from the provided
    /// [RuntimeOptions](bjs::RuntimeOptions)
    pub fn new(options: bjs::RuntimeOptions) -> Self {
        Self {
            deno: Rc::new(RefCell::new(dc::JsRuntime::new(options))),
        }
    }

    /// Creates a new [JsRuntimeBuilder](bjs::JsRuntimeBuilder) used to
    /// construct a [RuntimeOptions](bjs::RuntimeOptions)
    pub fn builder() -> bjs::JsRuntimeBuilder {
        bjs::JsRuntimeBuilder::default()
    }

    pub fn execute_script(
        &mut self,
        name: &str,
        source_code: &str,
    ) -> Result<v8::Global<v8::Value>, bjs::AnyError> {
        self.deno.borrow_mut().execute_script(name, source_code)
    }

    #[allow(clippy::await_holding_refcell_ref)]
    pub fn execute_module(
        &self,
        specifier: bjs::ModuleSpecifier,
        source_code: Option<String>,
    ) -> oneshot::Receiver<Result<(), bjs::AnyError>> {
        let (sender, receiver) = oneshot::channel();

        let deno = self.deno.clone();
        IoTaskPool::get()
            .spawn_local(async move {
                let mut deno = match deno.try_borrow_mut() {
                    Ok(deno) => deno,
                    Err(_) => {
                        let err = bjs::AnyError::msg("Could not borrow Deno runtime");
                        error!("{}", err);
                        let _ = sender.send(Err(err));
                        return;
                    }
                };

                let module_id = match deno.load_main_module(&specifier, source_code).await {
                    Ok(mid) => mid,
                    Err(err) => {
                        error!("Could not load module {}", &specifier);
                        error!("{}", err);
                        let _ = sender.send(Err(err));
                        return;
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
                        match recv.await {
                            Ok(res) => {
                                if let Err(err) = &res {
                                    error!("{}", err);
                                }
                                let _ = sender.send(res);
                            }
                            Err(_canceled) => {
                                let err = bjs::AnyError::msg("Module evaluation was canceled");
                                error!("{}", err);
                                let _ = sender.send(Err(err));
                            }
                        };
                    })
                    .detach();
            })
            .detach();

        receiver
    }
}

#[cfg(feature = "inspector")]
impl JsRuntime {
    /// Returns [InspectorInfo](bjs::inspector::InspectorInfo) necessary to
    /// register the inspector with the [JsRuntime]
    pub fn inspector(
        &self,
        name: String,
        host: std::net::SocketAddr,
    ) -> bjs::inspector::InspectorInfo {
        let inspector = self.deno.borrow_mut().inspector();
        let mut inspector = inspector.borrow_mut();
        crate::inspector::InspectorInfo::new(
            host,
            bevy::utils::Uuid::new_v4(),
            name,
            inspector.get_session_sender(),
            inspector.add_deregister_handler(),
            true,
        )
    }

    /// Registers inspector with the [JsRuntime]
    pub fn register_inspector(&self, name: String, meta: &bjs::inspector::InspectorMeta) {
        let info = self.inspector(name, meta.host);
        meta.register_inspector_tx
            .unbounded_send(info)
            .expect("Inspector server was dropped");
    }
}
