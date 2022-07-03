use crate as bjs;
use bevy::{
    prelude::*,
    reflect::{serde::UntypedReflectDeserializer, TypeRegistry},
};
use dc::{anyhow::Error as AnyError, op, serde::de::DeserializeSeed, serde_json::Value, OpState};
use deno_core as dc;
use std::{cell::RefCell, rc::Rc};

#[op]
pub fn op_entity_spawn(state: Rc<RefCell<OpState>>, rid_world: bjs::ResourceId) -> u64 {
    let res = bjs::runtimes::unwrap_bevy_resource(&state, rid_world);
    let world = res.world_mut();

    world.spawn().id().to_bits()
}

#[op]
pub fn op_entity_insert_component(
    state: Rc<RefCell<OpState>>,
    rid_world: bjs::ResourceId,
    e_entity: u64,
    component: Value,
) -> Result<(), AnyError> {
    let res = bjs::runtimes::unwrap_bevy_resource(&state, rid_world);

    let world = res.world_mut();
    let e_entity = Entity::from_bits(e_entity);

    let type_registry = world.resource::<TypeRegistry>().clone();
    let type_registry = type_registry.read();
    let reflect_deserializer = UntypedReflectDeserializer::new(&type_registry);

    dbg!(&component);

    let mut track = serde_path_to_error::Track::new();
    let tracked = serde_path_to_error::Deserializer::new(&component, &mut track);

    let component = match reflect_deserializer.deserialize(tracked) {
        Ok(component) => component,
        Err(err) => {
            return Err(AnyError::msg(format!(
                "{}, occured at {}",
                err,
                track.path()
            )));
        }
    };

    // TODO: Should remove this lookup by allowing type_id to be passed to deserializer
    let type_name = component.type_name();
    let registration = type_registry
        .get_with_name(type_name)
        .ok_or(AnyError::msg(format!(
            "Could not find type registration for {}",
            type_name
        )))?;

    if let Some(component_impl) =
        type_registry.get_type_data::<ReflectComponent>(registration.type_id())
    {
        component_impl.add_component(world, e_entity, component.as_reflect());
    }

    Ok(())
}
