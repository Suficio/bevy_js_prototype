use crate as bjs;
use bevy::prelude::*;
use bjs::{op, serde_v8, v8, OpState};
use deno_core::ZeroCopyBuf;
use std::{cell::RefCell, mem, rc::Rc};

pub(crate) fn entity_to_bytes(entity: &Entity) -> [u8; 8] {
    entity.to_bits().to_ne_bytes()
}

// TODO: Return as reference to Entity
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
pub fn op_entity_insert_component(
    state: Rc<RefCell<OpState>>,
    scope: &mut v8::HandleScope,
    world_resource_id: u32,
    entity_id: ZeroCopyBuf,
    // TODO: Pass constructor?
    type_id: &[u8],
    component: serde_v8::Value,
) -> Result<(), bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(&state.borrow(), world_resource_id);
    let mut world = res.borrow_world_mut();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();
    let type_id = super::type_registry::bytes_to_type_id(type_id);

    let component =
        bjs::runtimes::bevy::ext::deserialize(&type_registry, type_id, scope, component)?;
    // TODO(https://github.com/bevyengine/bevy/issues/4597):
    // Lookup necessary as long as component is dynamic
    let type_name = component.as_ref().type_name();

    // Verify `type_id` matches provided `component`
    #[cfg(debug_assertions)]
    {
        let registration = type_registry.get_with_name(type_name).ok_or_else(|| {
            bjs::AnyError::msg(format!(
                "Could not find type registration for: {}",
                type_name
            ))
        })?;

        debug_assert_eq!(registration.type_id(), type_id);
    }

    let component_impl = type_registry
        .get_type_data::<ReflectComponent>(type_id)
        .ok_or_else(|| {
            bjs::AnyError::msg(format!(
                "Component {} does not implement 'ReflectComponent'",
                type_name
            ))
        })?;

    let entity = bytes_to_entity(entity_id.as_ref());
    component_impl.apply_or_insert(&mut world, entity, component.as_reflect());

    Ok(())
}

#[op(v8)]
pub fn op_entity_get_component<'a>(
    state: Rc<RefCell<OpState>>,
    scope: &mut v8::HandleScope<'a>,
    world_resource_id: u32,
    entity_id: ZeroCopyBuf,
    // TODO: Pass constructor
    type_id: &[u8],
) -> Result<serde_v8::Value<'a>, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(&state.borrow(), world_resource_id);
    let world = res.borrow_world();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let type_id = super::type_registry::bytes_to_type_id(type_id);
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

    bjs::runtimes::bevy::ext::serialize(&type_registry, scope, value).map(serde_v8::Value::from)
}
