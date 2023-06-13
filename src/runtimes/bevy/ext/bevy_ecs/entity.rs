use super::keys::{self, KeyCache};
use crate as bjs;
use bevy::{
    ecs::component::ComponentDescriptor,
    prelude::*,
    ptr::{OwningPtr, Ptr},
};
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

/// Maintains a [v8::Map] that stores all dynamic [Components](Component)
/// associated with the [Entity].
#[derive(Component)]
struct ComponentExt(v8::Global<v8::Value>);

// SAFETY: [ComponentExt] is only ever accessed from the thread associated with
// the v8 instance.
unsafe impl Send for ComponentExt {}
unsafe impl Sync for ComponentExt {}

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

    let component = keys::unwrap_object(component.v8_value)?;
    let constructor = keys::unwrap_constructor(scope, key_cache, component)?.into();

    let entity = bytes_to_entity(entity_id.as_ref());

    // TypeId may not be available for dynamically registered components
    // need to fallback to `ComponentId` implementation
    let component = component.into();
    match keys::unwrap_type_id(scope, key_cache, constructor) {
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

            component_impl.apply_or_insert(&mut world.entity_mut(entity), component.as_reflect());
        }
        None => {
            let component_id = match keys::unwrap_component_id(
                scope,
                world.components(),
                key_cache,
                constructor,
            ) {
                Some(component_id) => component_id,
                None => {
                    // Since we are inserting the component then it may not yet be
                    // registered.
                    let descriptor = ComponentDescriptor::new::<ComponentExt>();
                    // [init_component_with_descriptor] avoids allocating a
                    // [Component] with an associated [TypeId].
                    let component_id = world.init_component_with_descriptor(descriptor);
                    keys::update_component_id(scope, key_cache, constructor, component_id);

                    component_id
                }
            };

            let component = ComponentExt(v8::Global::new(scope, component));
            OwningPtr::make(component, |component| {
                unsafe {
                    world
                        .entity_mut(entity)
                        .insert_by_id(component_id, component)
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
    let world = res.borrow_world();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let key_cache = state.borrow_mut::<KeyCache>();

    let constructor = keys::unwrap_function(constructor.v8_value)?;

    let entity = bytes_to_entity(entity_id.as_ref());
    let entity_ref = world.entity(entity);

    // TypeId may not be available for dynamically registered components
    // need to fallback to `ComponentId` implementation
    let value = match keys::unwrap_type_id(scope, key_cache, constructor.into()) {
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
                .reflect(entity_ref) else {
                    return Ok(v8::Local::<v8::Value>::from(v8::null(scope)).into())
                };

            bjs::runtimes::bevy::ext::serialize(&type_registry, scope, component)?
        }
        // If TypeId is not available, the component does not originate
        // from Rust and is dynamic.
        None => {
            // Check if component exists
            let Some(component) = keys::unwrap_component_id(scope, world.components(), key_cache, constructor.into())
                .and_then(|component_id| entity_ref.get_by_id(component_id)) else {
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
