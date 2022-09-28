use crate as bjs;
use bjs::{include_js_files, op, Extension, OpState};

mod entity;
mod world;

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_ecs",
            "03_ecs.js",
            "03_bevy_ecs.js",
            "04_entity.js",
            "05_world.js",
        ))
        .ops(vec![
            op_wait_for_world::decl(),
            entity::op_entity_spawn::decl(),
            entity::op_entity_insert_component::decl(),
            entity::op_entity_get_component::decl(),
            world::op_world_get_resource::decl(),
        ])
        .build()
}

#[op]
async fn op_wait_for_world(state: &mut OpState, rid: bjs::ResourceId) {
    bjs::runtimes::unwrap_world_resource(state, rid)
        .wait_for_world()
        .await
}
