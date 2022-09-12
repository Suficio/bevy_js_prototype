use crate::{self as bjs};
use dc::{anyhow::Error as AnyError, op, serde::de::DeserializeSeed, serde_v8, OpState};
use deno_core as dc;

use super::serde::de::DynamicReflectDeserializer;

#[op(v8)]
pub fn op_type_registry_register<'scope>(
    scope: &mut deno_core::v8::HandleScope<'scope>,
    state: &mut OpState,
    r_world: bjs::ResourceId,
    reflectable: serde_v8::Value,
) -> Result<(), AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);
    let _world = res.borrow_world_mut();

    // Deserialize reflectable value into a dynamic type

    let mut value_deserializer = serde_v8::Deserializer::new(scope, reflectable.v8_value, None);

    let mut track = serde_path_to_error::Track::new();
    let tracked = serde_path_to_error::Deserializer::new(&mut value_deserializer, &mut track);

    let reflected = DynamicReflectDeserializer
        .deserialize(tracked)
        .map_err(|err| AnyError::msg(format!("{}, occured at: {}", err, track.path())))?;

    dbg!(&reflected);
    dbg!(reflected.get_type_info());

    // TODO: How to get [TypeRegistration] from [dyn Reflect]?

    Ok(())
}
