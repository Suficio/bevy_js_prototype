use crate as bjs;
use bevy::reflect::{
    serde::{TypedReflectSerializer, UntypedReflectDeserializer},
    Reflect, TypeRegistryInternal,
};
use bjs::{
    serde::{de::DeserializeSeed, Serialize},
    v8,
};

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

pub fn deserialize<'scope>(
    type_registry: &TypeRegistryInternal,
    scope: &mut v8::HandleScope<'scope>,
    value: bjs::serde_v8::Value,
) -> Result<Box<dyn Reflect>, bjs::AnyError> {
    let reflect_deserializer = UntypedReflectDeserializer::new(type_registry);
    let mut value_deserializer = bjs::serde_v8::Deserializer::new(scope, value.v8_value, None);

    let mut track = serde_path_to_error::Track::new();
    let tracked = serde_path_to_error::Deserializer::new(&mut value_deserializer, &mut track);

    reflect_deserializer
        .deserialize(tracked)
        .map_err(|err| bjs::AnyError::msg(format!("{}, occured at: {}", err, track.path())))
}
