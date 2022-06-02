use bevy::prelude::*;

mod builder;
mod runtime;
pub mod runtimes;
mod world;

pub use builder::JsRuntimeBuilder;
pub use runtime::{IntoRuntime, JsRuntime, JsRuntimeResource};
pub use world::JsWorld;

pub use deno_core::{
    self, anyhow, futures, include_js_files, op, v8, Extension, ExtensionBuilder, ModuleId,
    ModuleSpecifier, OpState, Resource, ResourceId, ResourceTable, RuntimeOptions,
};

pub mod resolve {
    pub use deno_core::{
        resolve_import as import, resolve_path as path, resolve_url as url,
        resolve_url_or_path as url_or_path,
    };
}

/// Represents the entry plugin to get `bevy_js` up and running in your game
#[derive(Default)]
pub struct JsPlugin;

impl Plugin for JsPlugin {
    fn build(&self, app: &mut App) {
        app.init_non_send_resource::<JsRuntimeResource>()
            .add_system(runtime::drive_runtimes);
    }
}
