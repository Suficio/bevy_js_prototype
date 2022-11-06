use crate as bjs;
use bevy::reflect::{
    serde::{TypedReflectDeserializer, TypedReflectSerializer},
    Reflect, TypeRegistryInternal,
};
use bjs::{
    serde::{de::DeserializeSeed, Serialize},
    serde_v8, v8,
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

pub fn serialize<'a>(
    registry: &TypeRegistryInternal,
    scope: &mut v8::HandleScope<'a>,
    value: &dyn Reflect,
) -> Result<serde_v8::Value<'a>, bjs::AnyError> {
    let scope_ptr = std::cell::RefCell::new(scope);
    let value_serializer = serde_v8::Serializer::new(&scope_ptr);

    let mut track = serde_path_to_error::Track::new();
    let tracked = serde_path_to_error::Serializer::new(value_serializer, &mut track);

    TypedReflectSerializer::new(value, registry)
        .serialize(tracked)
        .map(|value| serde_v8::Value { v8_value: value })
        .map_err(|err| bjs::AnyError::msg(format!("{}, occured at: {}", err, track.path())))
}

pub fn deserialize(
    registry: &TypeRegistryInternal,
    type_id: std::any::TypeId,
    scope: &mut v8::HandleScope,
    value: serde_v8::Value,
) -> Result<Box<dyn Reflect>, bjs::AnyError> {
    let registration = registry.get(type_id).ok_or_else(|| {
        bjs::AnyError::msg(format!("Registration for type id: {:?} not found", type_id))
    })?;

    let mut value_deserializer = serde_v8::Deserializer::new(scope, value.v8_value, None);

    let mut track = serde_path_to_error::Track::new();
    let tracked = serde_path_to_error::Deserializer::new(&mut value_deserializer, &mut track);

    TypedReflectDeserializer::new(registration, registry)
        .deserialize(tracked)
        .map_err(|err| bjs::AnyError::msg(format!("{}, occured at: {}", err, track.path())))
}
