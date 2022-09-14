use crate as bjs;
use bevy::{prelude::*, reflect::serde::UntypedReflectDeserializer};
use bjs::{op, serde::de::DeserializeSeed, serde_v8, OpState};

#[op]
pub fn op_entity_spawn(state: &mut OpState, r_world: bjs::ResourceId) -> u64 {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let world = res.borrow_world_mut();

    world.spawn().id().to_bits()
}

#[op(v8)]
pub fn op_entity_insert_component<'scope>(
    scope: &mut deno_core::v8::HandleScope<'scope>,
    state: &mut OpState,
    r_world: bjs::ResourceId,
    e_entity: u64,
    component: serde_v8::Value,
) -> Result<(), bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let world = res.borrow_world_mut();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let reflect_deserializer = UntypedReflectDeserializer::new(&type_registry);
    let mut value_deserializer = serde_v8::Deserializer::new(scope, component.v8_value, None);

    let mut track = serde_path_to_error::Track::new();
    let tracked = serde_path_to_error::Deserializer::new(&mut value_deserializer, &mut track);

    let component = reflect_deserializer
        .deserialize(tracked)
        .map_err(|err| bjs::AnyError::msg(format!("{}, occured at: {}", err, track.path())))?;

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
    component_impl.insert(world, e_entity, component.as_reflect());

    Ok(())
}
