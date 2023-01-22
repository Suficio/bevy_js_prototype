use crate::{self as bjs, query::ComponentExt};
use bevy::{
    ecs::world::EntityMut,
    prelude::*,
    ptr::{OwningPtr, Ptr},
};
use bjs::{op, serde_v8, v8, OpState};
use deno_core::ZeroCopyBuf;
use std::mem;

use super::{
    keys::{self, KeyCache},
    query::QueryStateResource,
};

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

fn entity_insert_component<'a>(
    state: &mut OpState,
    scope: &mut v8::HandleScope<'a>,
    entity_mut: &mut EntityMut,
    component: serde_v8::Value<'a>,
) -> Result<(), bjs::AnyError> {
    let key_cache = state.borrow_mut::<KeyCache>();

    let component = keys::unwrap_object(component.v8_value)?;
    let constructor = keys::unwrap_constructor(scope, key_cache, component)?.into();

    // TypeId may not be available for dynamically registered components
    // need to fallback to `ComponentId` implementation
    let component = component.into();
    match keys::unwrap_type_id(scope, key_cache, constructor) {
        Some(type_id) => {
            let type_registry = entity_mut.world().resource::<AppTypeRegistry>().clone();
            let type_registry = type_registry.read();

            let component =
                bjs::runtimes::bevy::ext::deserialize(&type_registry, type_id, scope, component)?;

            let component_impl = type_registry
                .get_type_data::<ReflectComponent>(type_id)
                .ok_or_else(|| {
                    bjs::AnyError::msg(format!(
                        "Component {} is not reflectable",
                        component.as_ref().type_name()
                    ))
                })?;

            component_impl.apply_or_insert(entity_mut, component.as_reflect());
        }
        None => {
            // If TypeId is not available, the component does not originate
            // from Rust and is dynamic.
            let component_id = entity_mut.world_scope(|world| {
                keys::extract_component_id(scope, world, key_cache, constructor)
            })?;

            let component = ComponentExt(v8::Global::new(scope, component));
            OwningPtr::make(component, |component| {
                unsafe { entity_mut.insert_by_id(component_id, component) };
            });
        }
    };

    Ok(())
}

#[op(v8)]
fn op_entity_delegated_insert_component<'a>(
    state: &mut OpState,
    scope: &mut v8::HandleScope<'a>,
    query_resource_id: u32,
    component: serde_v8::Value<'a>,
) -> Result<(), bjs::AnyError> {
    let Ok(query_state) = state
        .resource_table
        .get::<QueryStateResource>(query_resource_id) else {
        return Err(bjs::AnyError::msg("Query resource was not instantiated or dropped"));
    };

    let mut entity_mut = query_state
        .delegated_entity
        .try_borrow_mut()
        .ok_or_else(|| {
            bjs::AnyError::msg("Entity was not delegated, call only in the context of Query::iter")
        })?;

    entity_insert_component(state, scope, &mut entity_mut, component)
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
    let mut world = res.world().borrow_mut();

    let entity = bytes_to_entity(entity_id.as_ref());
    let mut entity_mut = world.entity_mut(entity);

    // TypeId may not be available for dynamically registered components
    // need to fallback to `ComponentId` implementation
    entity_insert_component(state, scope, &mut entity_mut, component)
}

#[op(v8)]
pub fn op_entity_get_component<'a>(
    state: &mut OpState,
    scope: &mut v8::HandleScope<'a>,
    world_resource_id: u32,
    entity_id: ZeroCopyBuf,
    constructor: serde_v8::Value,
) -> Result<serde_v8::Value<'a>, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, world_resource_id);
    let world = res.world();

    // Expect type constructor as get parameter
    let constructor = keys::unwrap_function(constructor.v8_value)?;

    let entity = bytes_to_entity(entity_id.as_ref());

    // TypeId may not be available for dynamically registered components
    // need to fallback to `ComponentId` implementation
    let key_cache = state.borrow_mut::<KeyCache>();
    let value = match keys::unwrap_type_id(scope, key_cache, constructor.into()) {
        Some(type_id) => {
            let world = world.borrow();
            let entity_ref = world.entity(entity);

            let type_registry = world.resource::<AppTypeRegistry>().clone();
            let type_registry = type_registry.read();

            let component_impl = type_registry
                .get_type_data::<ReflectComponent>(type_id)
                .ok_or_else(|| {
                    let name = constructor.get_name(scope).to_rust_string_lossy(scope);
                    match type_registry.get_type_info(type_id) {
                        Some(type_info) => bjs::AnyError::msg(format!(
                            "Component {name} ({}) is not reflectable",
                            type_info.type_name()
                        )),
                        None => bjs::AnyError::msg(format!(
                            "Component with type ID {name} ({:?}) is not registered",
                            type_id,
                        )),
                    }
                })?;

            // Check if component exists
            let Some(component) = component_impl
                .reflect(entity_ref) else {
                    return Ok(v8::Local::<v8::Value>::from(v8::null(scope)).into())
                };

            bjs::runtimes::bevy::ext::serialize(&type_registry, scope, component)?
        }
        // If TypeId is not available, the component does not originate
        // from Rust and is dynamic.
        None => {
            let component_id =
                keys::try_extract_component_id(scope, world, key_cache, constructor.into())?;

            let world = world.borrow();
            let entity_ref = world.entity(entity);

            let Some(component) = entity_ref.get_by_id(component_id) else {
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
