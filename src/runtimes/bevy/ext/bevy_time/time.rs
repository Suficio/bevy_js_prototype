use crate as bjs;
use bevy::prelude::*;
use bjs::{op, serde_v8, v8, OpState};
use std::{cell::RefCell, rc::Rc};

#[op(v8)]
fn op_time_delta<'a>(
    state: Rc<RefCell<OpState>>,
    scope: &mut v8::HandleScope<'a>,
    r_world: bjs::ResourceId,
) -> Result<serde_v8::Value<'a>, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(&state.borrow(), r_world);
    let world = res.world().borrow();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let time = world.resource::<Time>();
    let duration: Box<dyn Reflect> = Box::new(time.delta());
    bjs::runtimes::bevy::ext::serialize(&type_registry, scope, duration.as_ref())
        .map(serde_v8::Value::from)
}

#[op(fast)]
fn op_time_delta_seconds(state: &mut OpState, r_world: bjs::ResourceId) -> f32 {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let world = res.world().borrow();

    let time = world.resource::<Time>();
    time.delta_seconds()
}

#[op(fast)]
fn op_time_seconds_since_startup(state: &mut OpState, r_world: bjs::ResourceId) -> f64 {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let world = res.world().borrow();

    let time = world.resource::<Time>();
    time.elapsed_seconds_f64()
}

#[op(v8)]
fn op_time_since_startup<'a>(
    state: Rc<RefCell<OpState>>,
    scope: &mut v8::HandleScope<'a>,
    r_world: bjs::ResourceId,
) -> Result<serde_v8::Value<'a>, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(&state.borrow(), r_world);
    let world = res.world().borrow();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let time = world.resource::<Time>();
    let duration: Box<dyn Reflect> = Box::new(time.delta());
    bjs::runtimes::bevy::ext::serialize(&type_registry, scope, duration.as_ref())
        .map(serde_v8::Value::from)
}
