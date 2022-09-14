use crate as bjs;
use bevy::prelude::*;
use std::rc::Rc;

pub mod ext;

/// Represents the default `bevy_js` [JsRuntime](bjs::JsRuntime) which provides
/// methods to interact with `Bevy` [Worlds](bevy::prelude::World).
pub struct BevyRuntime;

impl BevyRuntime {
    /// Provides a reference to the builder before it was used to construct
    /// [BevyRuntime]. Useful for extending the runtime to your needs.
    pub fn builder() -> bjs::JsRuntimeBuilder {
        let mut builder = bjs::JsRuntime::builder();
        builder
            .with_module_loader(Rc::new(bjs::FsModuleLoader))
            .with_extension(ext::bevy_ecs::init())
            .with_extension(ext::core::init())
            .with_extension(ext::alloc::init())
            .with_extension(ext::bevy_asset::init())
            .with_extension(ext::glam::init())
            .with_extension(ext::bevy_transform::init())
            .with_extension(ext::bevy_render::init())
            .with_extension(ext::bevy_text::init())
            .with_extension(ext::bevy_ui::init());

        builder
    }
}

impl bjs::IntoRuntime for BevyRuntime {
    fn into_runtime(_world: &mut World) -> bjs::JsRuntime {
        Self::builder().build()
    }
}
