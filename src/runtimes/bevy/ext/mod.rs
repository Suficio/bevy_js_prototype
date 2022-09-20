use crate as bjs;
use bevy::reflect::{serde::TypedReflectSerializer, Reflect, TypeRegistryInternal};
use bjs::serde::Serialize;

pub mod alloc;
pub mod bevy_asset;
pub mod bevy_ecs;
pub mod bevy_render;
pub mod bevy_text;
pub mod bevy_time;
pub mod bevy_transform;
pub mod bevy_ui;
pub mod core;
pub mod glam;

pub fn serialize(
    type_registry: &TypeRegistryInternal,
    value: &dyn Reflect,
) -> Result<serde_json::Value, bjs::AnyError> {
    let reflect_serializer = TypedReflectSerializer::new(value, type_registry);

    // TODO: Serialize v8 object directly
    // let scope_ptr = RefCell::new(scope);
    // let value_serializer = serde_v8::Serializer::new(&scope_ptr);
    let value_serializer = serde_json::value::Serializer;

    let mut track = serde_path_to_error::Track::new();
    let tracked = serde_path_to_error::Serializer::new(value_serializer, &mut track);

    reflect_serializer
        .serialize(tracked)
        .map_err(|err| bjs::AnyError::msg(format!("{}, occured at: {}", err, track.path())))
}
