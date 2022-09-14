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

// #[op(v8)]
// pub fn op_world_insert_resource<'scope>(
//     scope: &mut deno_core::v8::HandleScope<'scope>,
//     state: &mut OpState,
//     r_world: bjs::ResourceId,
//     type_name: String,
//     resource: serde_v8::Value,
// ) -> Result<(), bjs::AnyError> {
//     let res = bjs::runtimes::unwrap_world_resource(state, r_world);
//     let world = res.borrow_world_mut();

//     let type_registry = world.resource::<AppTypeRegistry>().clone();
//     let type_registry = type_registry.read();

//     let reflect_deserializer = UntypedReflectDeserializer::new(&type_registry);
//     let mut value_deserializer = serde_v8::Deserializer::new(scope, component.v8_value, None);

//     let mut track = serde_path_to_error::Track::new();
//     let tracked = serde_path_to_error::Deserializer::new(&mut value_deserializer, &mut track);

//     let component = reflect_deserializer
//         .deserialize(tracked)
//         .map_err(|err| bjs::AnyError::msg(format!("{}, occured at: {}", err, track.path())))?;

//     // TODO(@Suficio): Lookup necessary as long as component is dynamic
//     // https://github.com/bevyengine/bevy/issues/4597
//     let type_name = component.type_name();
//     let registration = type_registry.get_with_name(type_name).ok_or_else(|| {
//         bjs::AnyError::msg(format!(
//             "Could not find type registration for: {}",
//             type_name
//         ))
//     })?;

//     let component_impl = type_registry
//         .get_type_data::<ReflectComponent>(registration.type_id())
//         .ok_or_else(|| {
//             bjs::AnyError::msg(format!(
//                 "Component {} does not implement 'ReflectComponent'",
//                 type_name
//             ))
//         })?;

//     let e_entity = Entity::from_bits(e_entity);
//     component_impl.insert(world, e_entity, component.as_reflect());

//     Ok(())
// }
