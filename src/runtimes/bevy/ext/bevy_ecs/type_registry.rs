//! Handles operations on the TypeRegistry of a World

use std::any::TypeId;

use crate as bjs;
use bevy::prelude::*;
use bjs::{op, OpState};

/// Returns [TypeId] from type registration in [AppTypeRegistry] from the type
/// name.
//
// TODO(https://github.com/denoland/deno/pull/16014): String fast ops
#[op]
fn op_type_registry_get_type_id_with_name(
    state: &mut OpState,
    world_resource_id: u32,
    type_name: String,
    out: &mut [u8],
) -> Result<(), bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, world_resource_id);
    let world = res.borrow_world();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let type_id = type_registry
        .get_with_name(&type_name)
        .ok_or(bjs::AnyError::msg(format!(
            "Could not find type registration for: {}",
            type_name
        )))?
        .type_id();

    let slice = unsafe {
        std::slice::from_raw_parts(
            (&type_id as *const TypeId) as *const u8,
            std::mem::size_of::<TypeId>(),
        )
    };

    out.copy_from_slice(slice);

    Ok(())
}
