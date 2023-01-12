use crate::{self as bjs, query::ComponentExt};
use bevy::{
    prelude::*,
    ptr::{OwningPtr, Ptr},
};
use bjs::{op, serde_v8, v8, OpState};
use deno_core::ZeroCopyBuf;
use std::mem;

use super::keys::{self, KeyCache};

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
    let world = res.world();

    let registry = world.borrow().resource::<AppTypeRegistry>().clone();
    let registry = registry.read();

    let key_cache = state.borrow_mut::<KeyCache>();

    let component = keys::unwrap_object(component.v8_value)?;
    let constructor = keys::extract_constructor(scope, key_cache, component)?.into();

    let entity = bytes_to_entity(entity_id.as_ref());

    // TypeId may not be available for dynamically registered components
    // need to fallback to `ComponentId` implementation
    let component = component.into();
    match keys::extract_type_id(scope, key_cache, constructor) {
        Some(type_id) => {
            let component =
                bjs::runtimes::bevy::ext::deserialize(&registry, type_id, scope, component)?;

            let component_impl = registry
                .get_type_data::<ReflectComponent>(type_id)
                .ok_or_else(|| {
                    bjs::AnyError::msg(format!(
                        "Component {} is not reflectable",
                        component.as_ref().type_name()
                    ))
                })?;

            component_impl.apply_or_insert(&mut world.borrow_mut(), entity, component.as_reflect());
        }
        None => {
            // If TypeId is not available, the component does not originate
            // from Rust and is dynamic.
            let bundle_id = keys::extract_bundle_id(scope, world, key_cache, constructor)?;

            let component = ComponentExt(v8::Global::new(scope, component));
            OwningPtr::make(component, |component| {
                unsafe {
                    world
                        .borrow_mut()
                        .entity_mut(entity)
                        .insert_by_id(bundle_id, component)
                };
            });
        }
    };

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
    let world = res.world();

    let type_registry = world.borrow().resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let key_cache = state.borrow_mut::<KeyCache>();

    // Expect type constructor as get parameter
    let constructor = keys::unwrap_function(constructor.v8_value)?;

    let entity = bytes_to_entity(entity_id.as_ref());

    // TypeId may not be available for dynamically registered components
    // need to fallback to `ComponentId` implementation
    let value = match keys::extract_type_id(scope, key_cache, constructor.into()) {
        Some(type_id) => {
            let component_impl = type_registry
                .get_type_data::<ReflectComponent>(type_id)
                .ok_or_else(|| match type_registry.get_type_info(type_id) {
                    Some(type_info) => bjs::AnyError::msg(format!(
                        "Component {} is not reflectable",
                        type_info.type_name()
                    )),
                    None => bjs::AnyError::msg(format!(
                        "Component with TypeId {:?} is not registered",
                        type_id
                    )),
                })?;

            // Check if component exists
            let Some(component) = component_impl
                .reflect(&world.borrow(), entity) else {
                    return Ok(v8::Local::<v8::Value>::from(v8::null(scope)).into())
                };

            bjs::runtimes::bevy::ext::serialize(&type_registry, scope, component)?
        }
        // If TypeId is not available, the component does not originate
        // from Rust and is dynamic.
        None => {
            let component_id =
                keys::extract_component_id(scope, world, key_cache, constructor.into())?;

            let Some(component) = world.borrow().entity(entity).get_by_id(component_id) else {
                return Ok(v8::Local::<v8::Value>::from(v8::null(scope)).into())
            };

            // Do not call `entity.get::<ComponentExt>` as [ComponentExt]
            // can have different component ids.
            let component = unsafe { Ptr::deref::<ComponentExt>(component) };
            v8::Local::new(scope, &component.0)
        }
    };

    // TODO: Cache new instances
    let value = constructor.new_instance(scope, &[value]).unwrap();
    Ok(serde_v8::Value::from(v8::Local::<v8::Value>::from(value)))
}
