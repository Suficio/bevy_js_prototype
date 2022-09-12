use crate as bjs;
use dc::{include_js_files, op, Extension, OpState};
use deno_core as dc;

mod entity;
mod reflect;
pub mod serde;

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_ecs",
            "03_ecs.js",
            "04_reflect.js",
            "04_entity.js",
            "05_world.js",
        ))
        .ops(vec![
            op_wait_for_world::decl(),
            reflect::op_type_registry_register::decl(),
            entity::op_entity_spawn::decl(),
            entity::op_entity_insert_component::decl(),
        ])
        .build()
}

#[op]
async fn op_wait_for_world(state: &mut OpState, rid: bjs::ResourceId) {
    bjs::runtimes::unwrap_world_resource(state, rid)
        .wait_for_world()
        .await
}
