use crate as bjs;
use bjs::{include_js_files, op, Extension, OpState};

mod entity;

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_ecs",
            "03_ecs.js",
            "04_reflect.js",
        ))
        .ops(vec![
            op_request_system::decl(),
            entity::op_entity_spawn::decl(),
            entity::op_entity_insert_component::decl(),
        ])
        .build()
}

#[op]
async fn op_request_system(state: &mut OpState, rid: bjs::ResourceId) {
    bjs::runtimes::unwrap_world_resource(state, rid)
        .wait_for_world()
        .await
}
