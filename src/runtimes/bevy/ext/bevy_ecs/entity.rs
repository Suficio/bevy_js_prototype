use super::keys::{unwrap_constructor, unwrap_function, unwrap_object, unwrap_type_id, KeyCache};
use crate as bjs;
use bevy::prelude::*;
use bjs::{op, serde_v8, v8, OpState};
use deno_core::ZeroCopyBuf;
use std::mem;

pub(crate) fn entity_to_bytes(entity: &Entity) -> [u8; 8] {
    entity.to_bits().to_ne_bytes()
}

pub(crate) fn bytes_to_entity(entity_id: &[u8]) -> Entity {
    let id = unsafe {
        let mut out = [0u8; mem::size_of::<u64>()];
        out.clone_from_slice(entity_id);
        mem::transmute(out)
    };
    Entity::from_bits(id)
}

/// SAFETY: `type_id` must match provided `component`
#[op(v8)]
pub fn op_entity_insert_component<'a>(
    state: &mut OpState,
    scope: &mut v8::HandleScope<'a>,
    world_resource_id: u32,
    entity_id: ZeroCopyBuf,
    component: serde_v8::Value<'a>,
) -> Result<(), bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, world_resource_id);
    let mut world = res.borrow_world_mut();

    let registry = world.resource::<AppTypeRegistry>().clone();
    let registry = registry.read();

    let key_cache = state.borrow_mut::<KeyCache>();

    let component = unwrap_object(component.v8_value)?;
    let constructor = unwrap_constructor(scope, key_cache, component)?;

    // TODO: TypeId may not be available for dynamically registered components
    // need to fallback to `ComponentId` implementation
    let type_id = unwrap_type_id(scope, key_cache, constructor.into())?;

    let component =
        bjs::runtimes::bevy::ext::deserialize(&registry, type_id, scope, component.into())?;

    let component_impl = registry
        .get_type_data::<ReflectComponent>(type_id)
        .ok_or_else(|| {
            bjs::AnyError::msg(format!(
                "Component {} does not implement 'ReflectComponent'",
                component.as_ref().type_name()
            ))
        })?;

    let entity = bytes_to_entity(entity_id.as_ref());
    component_impl.apply_or_insert(&mut world, entity, component.as_reflect());

    Ok(())
}

#[op(v8)]
pub fn op_entity_get_component<'a>(
    state: &mut OpState,
    scope: &mut v8::HandleScope<'a>,
    world_resource_id: u32,
    entity_id: ZeroCopyBuf,
    constructor: serde_v8::Value,
) -> Result<serde_v8::Value<'a>, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(&state, world_resource_id);
    let world = res.borrow_world();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let key_cache = state.borrow_mut::<KeyCache>();

    let constructor = unwrap_function(constructor.v8_value)?;

    // TODO: TypeId may not be available for dynamically registered components
    // need to fallback to `ComponentId` implementation
    let type_id = unwrap_type_id(scope, key_cache, constructor.into())?;

    let component_impl = type_registry
        .get_type_data::<ReflectComponent>(type_id)
        .ok_or_else(|| match type_registry.get_type_info(type_id) {
            Some(type_info) => bjs::AnyError::msg(format!(
                "Component {} does not implement ReflectComponent",
                type_info.type_name()
            )),
            None => bjs::AnyError::msg(format!(
                "Component with TypeId {:?} is not registered",
                type_id
            )),
        })?;

    let entity = bytes_to_entity(entity_id.as_ref());
    let value = component_impl.reflect(&world, entity).ok_or_else(|| {
        // SAFE: TypeInfo is registered otherwise ReflectComponent lookup would error
        let type_info = type_registry.get_type_info(type_id).unwrap();
        bjs::AnyError::msg(format!(
            "Could not get component {} as it does not exist",
            type_info.type_name()
        ))
    })?;

    let component = bjs::runtimes::bevy::ext::serialize(&type_registry, scope, value)?;

    // TODO: Cache new instances
    let typed_value = constructor.new_instance(scope, &[component]).unwrap();

    Ok(v8::Local::<v8::Value>::from(typed_value).into())
}
