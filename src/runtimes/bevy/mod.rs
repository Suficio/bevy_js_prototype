use crate as bjs;
use bevy::prelude::*;
use dc::{anyhow::Error as AnyError, op, OpState};
use deno_core as dc;
use std::rc::Rc;

mod entity;
pub mod ext;

/// Represents the default `bevy_js` [JsRuntime](bjs::JsRuntime) which provides
/// methods to interact with `Bevy` [Worlds](bevy::prelude::World).
pub struct BevyRuntime;

impl BevyRuntime {
    /// Provides a reference to the builder before it was used to construct
    /// [BevyRuntime]. Useful for extending the runtime to your needs.
    pub fn builder() -> bjs::JsRuntimeBuilder {
        let extension = bjs::Extension::builder()
            .js(bjs::include_js_files!(
                prefix "bevy:core",
                "03_ecs.js",
            ))
            .ops(vec![
                op_request_system::decl(),
                entity::op_entity_spawn::decl(),
                entity::op_entity_insert_component::decl(),
            ])
            .build();

        let mut builder = bjs::JsRuntime::builder();
        builder
            .with_module_loader(Rc::new(bjs::FsModuleLoader))
            .with_extension(extension)
            .with_extension(ext::bevy_asset::init());

        builder
    }
}

impl bjs::IntoRuntime for BevyRuntime {
    fn runtime(_world: &mut World) -> bjs::JsRuntime {
        Self::builder().build()
    }
}

#[op]
#[allow(clippy::await_holding_refcell_ref)]
async fn op_request_system(state: &mut OpState, rid: bjs::ResourceId) -> Result<(), AnyError> {
    bjs::runtimes::unwrap_world_resource(state, rid)
        .wait_for_world()
        .await
}
