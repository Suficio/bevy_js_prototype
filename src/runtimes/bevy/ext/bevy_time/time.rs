use crate as bjs;
use bevy::prelude::*;
use bjs::{op, OpState};

#[op]
fn op_time_delta(
    state: &mut OpState,
    r_world: bjs::ResourceId,
) -> Result<serde_json::Value, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let world = res.borrow_world();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let time = world.resource::<Time>();
    let duration: Box<dyn Reflect> = Box::new(time.delta());
    bjs::runtimes::bevy::ext::serialize(&type_registry, duration.as_ref())
}

#[op(fast)]
fn op_time_delta_seconds(state: &mut OpState, r_world: bjs::ResourceId) -> f32 {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let world = res.borrow_world();

    let time = world.resource::<Time>();
    time.delta_seconds()
}

#[op(fast)]
fn op_time_seconds_since_startup(state: &mut OpState, r_world: bjs::ResourceId) -> f64 {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let world = res.borrow_world();

    let time = world.resource::<Time>();
    time.elapsed_seconds_f64()
}

#[op]
fn op_time_since_startup(
    state: &mut OpState,
    r_world: bjs::ResourceId,
) -> Result<serde_json::Value, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let world = res.borrow_world();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let time = world.resource::<Time>();
    let duration: Box<dyn Reflect> = Box::new(time.delta());
    bjs::runtimes::bevy::ext::serialize(&type_registry, duration.as_ref())
}
