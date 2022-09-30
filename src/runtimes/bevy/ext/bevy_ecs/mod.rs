use crate as bjs;
use bjs::{include_js_files, op, OpState};
use std::rc::Rc;

// mod component;
mod entity;
mod query;
mod type_registry;
mod world;

pub fn init(resource: Rc<bjs::WorldResource>) -> bjs::Extension {
    bjs::Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_ecs",
            "03_ecs.js",
            "03_bevy_ecs.js",
            "04_entity.js",
            "05_query.js",
            "06_world.js",
        ))
        .ops(vec![
            op_wait_for_frame::decl(),
            entity::op_entity_spawn::decl(),
            entity::op_entity_insert_component::decl(),
            entity::op_entity_get_component::decl(),
            world::op_world_get_resource::decl(),
            type_registry::op_type_registry_get_type_id_with_name::decl(),
        ])
        .state(move |state| {
            state.resource_table.add_rc(resource.clone());
            Ok(())
        })
        .build()
}

/// Waits until world becomes available to read from
#[op]
async fn op_wait_for_frame(state: &mut OpState, world_resource_id: u32) {
    bjs::runtimes::unwrap_world_resource(state, world_resource_id)
        .wait_for_frame()
        .await
}
