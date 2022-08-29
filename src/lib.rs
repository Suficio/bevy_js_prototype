mod builder;
#[cfg(feature = "inspector")]
pub mod inspector;
pub mod lend;
mod loader;
mod runtime;
pub mod runtimes;
mod world;

use bevy::prelude::*;
use std::marker::PhantomData;

pub use builder::JsRuntimeBuilder;
pub use loader::FsModuleLoader;
pub use runtime::{drive_runtime, IntoRuntime, JsRuntime, JsRuntimeResource};
pub use world::WorldResource;

pub use deno_core::{
    self, anyhow, futures, include_js_files, op, v8, Extension, ExtensionBuilder, ModuleId,
    ModuleLoader, ModuleSource, ModuleSourceFuture, ModuleSpecifier, ModuleType, OpState, Resource,
    ResourceId, ResourceTable, RuntimeOptions,
};

pub mod resolve {
    pub use deno_core::{
        resolve_import as import, resolve_path as path, resolve_url as url,
        resolve_url_or_path as url_or_path,
    };
}

/// Provides a shorthand to register a runtime [R] and drive it
pub struct JsPlugin<R>(PhantomData<R>);

impl<R: IntoRuntime + Send + Sync + 'static> Plugin for JsPlugin<R> {
    fn build(&self, app: &mut App) {
        #[cfg(feature = "inspector")]
        {
            let host = std::net::SocketAddr::new("127.0.0.1".parse().unwrap(), 9229);
            app.insert_resource(inspector::JsInspector::new(host));
        }

        app.init_non_send_resource::<JsRuntimeResource<R>>()
            .add_system(drive_runtime::<R>.exclusive_system());
    }
}

impl<R> Default for JsPlugin<R> {
    fn default() -> Self {
        Self(Default::default())
    }
}
