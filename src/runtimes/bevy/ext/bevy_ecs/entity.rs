use crate as bjs;
use bevy::prelude::*;
use bjs::{op, serde_v8, v8, OpState};

#[op]
pub fn op_entity_spawn(state: &mut OpState, r_world: bjs::ResourceId) -> u64 {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let mut world = res.borrow_world_mut();

    world.spawn_empty().id().to_bits()
}

#[op(v8)]
pub fn op_entity_insert_component<'scope>(
    scope: &mut v8::HandleScope<'scope>,
    state: &mut OpState,
    r_world: bjs::ResourceId,
    e_entity: u64,
    component: serde_v8::Value,
) -> Result<(), bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let mut world = res.borrow_world_mut();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let component = bjs::runtimes::bevy::ext::deserialize(&type_registry, scope, component)?;

    // TODO(@Suficio): Lookup necessary as long as component is dynamic
    // https://github.com/bevyengine/bevy/issues/4597
    let type_name = component.type_name();
    let registration = type_registry.get_with_name(type_name).ok_or_else(|| {
        bjs::AnyError::msg(format!(
            "Could not find type registration for: {}",
            type_name
        ))
    })?;

    let component_impl = type_registry
        .get_type_data::<ReflectComponent>(registration.type_id())
        .ok_or_else(|| {
            bjs::AnyError::msg(format!(
                "Component {} does not implement 'ReflectComponent'",
                type_name
            ))
        })?;

    let e_entity = Entity::from_bits(e_entity);
    component_impl.apply_or_insert(&mut world, e_entity, component.as_reflect());

    Ok(())
}

#[op]
pub fn op_entity_get_component(
    state: &mut OpState,
    r_world: bjs::ResourceId,
    e_entity: u64,
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
    let component_impl = type_registry
        .get_type_data::<ReflectComponent>(type_id)
        .ok_or_else(|| {
            bjs::AnyError::msg(format!(
                "Component {} does not implement ReflectComponent",
                type_name
            ))
        })?;

    let e_entity = Entity::from_bits(e_entity);
    let value = component_impl.reflect(&world, e_entity).ok_or_else(|| {
        bjs::AnyError::msg(format!(
            "Could not get component {} as it does not exist",
            type_name
        ))
    })?;

    bjs::runtimes::bevy::ext::serialize(&type_registry, value)
}
