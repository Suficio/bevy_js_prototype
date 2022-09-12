use crate as bjs;
use bevy::{
    prelude::*,
    reflect::{serde::UntypedReflectDeserializer, TypeRegistryInternal},
};
use dc::{
    anyhow::Error as AnyError, include_js_files, op, serde::de::DeserializeSeed, serde_v8,
    Extension, OpState,
};
use deno_core as dc;

mod entity;
mod reflect;
pub mod serde;

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_ecs",
            "03_ecs.js",
            "04_reflect.js",
            "04_entity.js",
            "05_world.js",
        ))
        .ops(vec![
            op_wait_for_world::decl(),
            entity::op_entity_spawn::decl(),
            entity::op_entity_insert_component::decl(),
        ])
        .build()
}

pub(crate) fn deserialize_reflect<'scope>(
    scope: &mut deno_core::v8::HandleScope<'scope>,
    type_registry: &TypeRegistryInternal,
    value: serde_v8::Value,
) -> Result<Box<dyn Reflect>, AnyError> {
    let reflect_deserializer = UntypedReflectDeserializer::new(&type_registry);

    let mut value_deserializer = serde_v8::Deserializer::new(scope, value.v8_value, None);

    let mut track = serde_path_to_error::Track::new();
    let tracked = serde_path_to_error::Deserializer::new(&mut value_deserializer, &mut track);

    reflect_deserializer
        .deserialize(tracked)
        .map_err(|err| AnyError::msg(format!("{}, occured at: {}", err, track.path())))
}

#[op]
async fn op_wait_for_world(state: &mut OpState, rid: bjs::ResourceId) {
    bjs::runtimes::unwrap_world_resource(state, rid)
        .wait_for_world()
        .await
}
