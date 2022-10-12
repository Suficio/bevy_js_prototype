use crate as bjs;
use bjs::include_js_files;
use std::rc::Rc;

pub mod ext;

pub fn init() -> bjs::Extension {
    bjs::Extension::builder()
        .js(include_js_files!(
            prefix "bevy",
            "./03_console.js",
        ))
        .build()
}

/// Represents the default `bevy_js` [JsRuntime](bjs::JsRuntime) which provides
/// methods to interact with `Bevy` [Worlds](bevy::prelude::World).
pub struct BevyRuntime;

impl BevyRuntime {
    /// Provides a reference to the builder before it was used to construct
    /// [BevyRuntime]. Useful for extending the runtime to your needs.
    pub fn builder(resource: Rc<bjs::WorldResource>) -> bjs::JsRuntimeBuilder {
        bjs::JsRuntime::builder()
            .with_module_loader(Rc::new(bjs::FsModuleLoader))
            .with_extension(deno_console::init())
            .with_extension(init())
            .with_extension(ext::bevy_ecs::init(resource))
            .with_extension(ext::core::init())
            .with_extension(ext::alloc::init())
            .with_extension(ext::bevy_asset::init())
            .with_extension(ext::glam::init())
            .with_extension(ext::bevy_transform::init())
            .with_extension(ext::bevy_render::init())
            .with_extension(ext::bevy_text::init())
            .with_extension(ext::bevy_ui::init())
            .with_extension(ext::bevy_time::init())
    }
}

impl bjs::IntoRuntime for BevyRuntime {
    fn into_runtime(resource: Rc<bjs::WorldResource>) -> bjs::JsRuntime {
        // Register [JsRuntimeWorld] with the runtime so Bevy specific ops can
        // have access to the [World].
        Self::builder(resource).build()
    }
}
