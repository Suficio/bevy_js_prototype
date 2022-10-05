use crate as bjs;
use bevy::prelude::*;
use bjs::{
    futures::{channel::oneshot, executor, future},
    v8,
};
use std::{marker::PhantomData, task::Poll};

pub struct JsRuntimeResource<R> {
    runtime: bjs::JsRuntime,
    _phantom: PhantomData<R>,
}

impl<R: bjs::IntoRuntime> FromWorld for JsRuntimeResource<R> {
    fn from_world(world: &mut World) -> Self {
        // TODO: Use World::resource_scope
        let resource = world
            .non_send_resource::<bjs::WorldResourceExt>()
            .inner()
            .clone();

        // Runtime must be initialized in a Bevy context
        let r = resource.clone();
        let runtime = resource.lend(world, || R::into_runtime(r));

        Self {
            runtime,
            _phantom: PhantomData::default(),
        }
    }
}

impl<R> JsRuntimeResource<R> {
    pub fn execute_script(
        &mut self,
        name: &str,
        source_code: &str,
    ) -> Result<v8::Global<v8::Value>, bjs::AnyError> {
        self.runtime.execute_script(name, source_code)
    }

    pub fn execute_module(
        &mut self,
        specifier: bjs::ModuleSpecifier,
        source_code: Option<String>,
    ) -> oneshot::Receiver<Result<(), bjs::AnyError>> {
        self.runtime.execute_module(specifier, source_code)
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
        self.runtime.inspector(name, host)
    }

    /// Registers inspector with the [JsRuntime]
    pub fn register_inspector(&self, meta: &bjs::inspector::InspectorMeta) {
        let name = std::any::type_name::<R>().to_string();
        self.runtime.register_inspector(name, meta);
    }
}

/// Drives a [JsRuntime] contained within a [JsRuntimeResource]
pub fn drive_runtime<R: 'static>(world: &mut World) {
    // TODO: Use World::resource_scope
    let res = world
        .non_send_resource::<bjs::WorldResourceExt>()
        .inner()
        .clone();

    let deno = world
        .non_send_resource::<JsRuntimeResource<R>>()
        .runtime
        .deno
        .clone();

    // Lend [World] reference to the resource and execute the Deno event loop
    // within the scope
    res.lend(world, || {
        executor::block_on(future::poll_fn(move |cx| {
            let mut deno = match deno.try_borrow_mut() {
                Ok(deno) => deno,
                Err(_) => return Poll::Ready(()),
            };

            if let Poll::Ready(Err(err)) = deno.poll_event_loop(cx, false) {
                error!("{}", err)
            }

            Poll::Ready(())
        }));
    });
}
