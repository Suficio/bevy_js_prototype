use crate::{self as bjs};
use bevy::prelude::error;
use bjs::{
    deno_core as dc,
    futures::{channel::oneshot, executor, future},
    v8,
};
use std::{rc::Rc, task::Poll};

/// Trait used to construct [JsRuntimes](bjs::JsRuntime)
pub trait IntoRuntime {
    fn into_runtime(resource: Rc<bjs::WorldResource>) -> JsRuntime;
}

pub struct JsRuntime {
    pub deno: dc::JsRuntime,
    pub pending_mod_evaluate: Option<bjs::ModuleId>,
}

impl JsRuntime {
    /// Creates a new [JsRuntime] from the provided
    /// [RuntimeOptions](bjs::RuntimeOptions)
    pub fn new(options: bjs::RuntimeOptions) -> Self {
        Self {
            deno: dc::JsRuntime::new(options),
            pending_mod_evaluate: None,
        }
    }

    /// Creates a new [JsRuntimeBuilder](bjs::JsRuntimeBuilder) used to
    /// construct a [RuntimeOptions](bjs::RuntimeOptions)
    pub fn builder() -> bjs::JsRuntimeBuilder {
        bjs::JsRuntimeBuilder::default()
    }

    /// Executes a script on the [JsRuntime]
    ///
    /// # Safety
    ///
    /// Script must be executed in the context of a Bevy world
    pub fn execute_script(
        &mut self,
        name: &str,
        source_code: &str,
    ) -> Result<v8::Global<v8::Value>, bjs::AnyError> {
        self.deno.execute_script(name, source_code)
    }

    /// Loads a module and its dependencies for later execution
    ///
    /// To execute the loaded module call [JsRuntime::execute_module]
    pub async fn load_module(
        &mut self,
        specifier: &bjs::ModuleSpecifier,
        source_code: Option<String>,
    ) -> Result<(), bjs::AnyError> {
        // Module will be evaluated by [drive_runtime]
        let module_id = self.deno.load_main_module(specifier, source_code).await?;
        self.pending_mod_evaluate = Some(module_id);
        Ok(())
    }

    /// Executes a module after it has been loaded on the [JsRuntime]
    ///
    /// # Safety
    ///
    /// Module must be executed in the context of a Bevy world
    pub fn execute_module(
        &mut self,
        module_id: bjs::ModuleId,
    ) -> oneshot::Receiver<Result<(), bjs::AnyError>> {
        self.deno.mod_evaluate(module_id)
    }

    /// Polls the event loop of the [JsRuntime]
    ///
    /// # Safety
    ///
    /// Event loop must be polled in the context of a Bevy world
    pub fn poll_runtime(&mut self) {
        executor::block_on(future::poll_fn(move |cx| {
            if let Poll::Ready(Err(err)) = self.deno.poll_event_loop(cx, false) {
                error!("{}", err);
            };

            Poll::Ready(())
        }))
    }
}

#[cfg(feature = "inspector")]
impl JsRuntime {
    /// Returns [InspectorInfo](bjs::inspector::InspectorInfo) necessary to
    /// register the inspector with the [JsRuntime]
    pub fn inspector(
        &mut self,
        name: String,
        host: std::net::SocketAddr,
    ) -> bjs::inspector::InspectorInfo {
        let inspector = self.deno.inspector();
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
    pub fn register_inspector(&mut self, name: String, meta: &bjs::inspector::InspectorMeta) {
        let info = self.inspector(name, meta.host);
        meta.register_inspector_tx
            .unbounded_send(info)
            .expect("Inspector server was dropped");
    }
}
