use crate as bjs;
use bevy::{prelude::*, reflect::ReflectFromPtr};
use bjs::{op, OpState};

#[op(v8)]
pub fn op_world_get_resource<'scope>(
    // scope: &mut deno_core::v8::HandleScope<'scope>,
    state: &mut OpState,
    r_world: bjs::ResourceId,
    type_name: String,
) -> Result<serde_json::Value, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let world = res.borrow_world_mut();

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
    bjs::runtimes::bevy::ext::serialize(&type_registry, value)
}
