use std::{cell::RefCell, rc::Rc};

use crate as bjs;
use bevy::{prelude::*, reflect::ReflectFromPtr};
use bjs::{op, serde_v8, v8, OpState};

#[op(fast)]
pub fn op_world_entity_spawn(state: &mut OpState, world_resource_id: u32, out: &mut [u8]) {
    let res = bjs::runtimes::unwrap_world_resource(state, world_resource_id);
    let mut world = res.borrow_world_mut();

    super::entity::entity_to_bytes(&world.spawn_empty().id(), out)
}

#[op(v8)]
pub fn op_world_get_resource<'a>(
    state: Rc<RefCell<OpState>>,
    scope: &mut v8::HandleScope<'a>,
    r_world: bjs::ResourceId,
    type_name: String,
) -> Result<serde_v8::Value<'a>, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(&state.borrow(), r_world);
    let world = res.borrow_world();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let registration = type_registry.get_with_name(&type_name).ok_or_else(|| {
        bjs::AnyError::msg(format!(
            "Could not find type registration for: {}",
            type_name
        ))
    })?;

    let type_id = registration.type_id();
    let component_id = world.components().get_resource_id(type_id).ok_or_else(|| {
        bjs::AnyError::msg(format!(
            "Resource of type: {} was not initialized",
            type_name
        ))
    })?;

    let resource = world.get_resource_by_id(component_id).unwrap();

    let reflect_from_ptr = type_registry
        .get_type_data::<ReflectFromPtr>(type_id)
        .ok_or_else(|| {
            bjs::AnyError::msg(format!(
                "Component {} does not implement 'ReflectFromPtr'",
                type_name
            ))
        })?;

    // SAFE: TypeId is correct
    let value = unsafe { reflect_from_ptr.as_reflect_ptr(resource) };
    bjs::runtimes::bevy::ext::serialize(&type_registry, scope, value)
}
