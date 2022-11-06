//! Handles operations on the TypeRegistry of a World

use crate as bjs;
use bevy::{ecs::component::ComponentId, prelude::*};
use bjs::{op, OpState};
use std::{any::TypeId, cell::RefCell, mem, rc::Rc, slice};

pub(crate) fn type_id_to_bytes(type_id: &TypeId, out: &mut [u8]) {
    unsafe {
        out.copy_from_slice(slice::from_raw_parts(
            (type_id as *const TypeId) as *const u8,
            mem::size_of::<TypeId>(),
        ));
    }
}

pub(crate) fn bytes_to_type_id(type_id: &[u8]) -> TypeId {
    unsafe {
        let mut out = [0u8; mem::size_of::<TypeId>()];
        out.clone_from_slice(type_id);
        mem::transmute(out)
    }
}

pub(crate) fn component_id_to_bytes(component_id: &ComponentId, out: &mut [u8]) {
    unsafe {
        out.copy_from_slice(slice::from_raw_parts(
            (component_id as *const ComponentId) as *const u8,
            mem::size_of::<ComponentId>(),
        ));
    }
}

#[allow(dead_code)]
pub(crate) fn bytes_to_component_id(component_id: &[u8]) -> ComponentId {
    unsafe {
        let mut out = [0u8; mem::size_of::<ComponentId>()];
        out.clone_from_slice(component_id);
        mem::transmute(out)
    }
}

/// Returns [TypeId] from type registration in [AppTypeRegistry] from the type
/// name.
//
// TODO(https://github.com/denoland/deno/pull/16014): String fast ops
#[op]
fn op_type_registry_get_type_id_with_name(
    state: Rc<RefCell<OpState>>,
    world_resource_id: u32,
    type_name: String,
    out: &mut [u8],
) -> bool {
    let res = bjs::runtimes::unwrap_world_resource(&state.borrow(), world_resource_id);
    let world = res.borrow_world();

    let type_registry = world.resource::<AppTypeRegistry>().clone();
    let type_registry = type_registry.read();

    let type_id = match type_registry.get_with_name(&type_name) {
        Some(registration) => registration.type_id(),
        None => return false,
    };

    type_id_to_bytes(&type_id, out);

    true
}

/// Returns [ComponentId] from type registration in [AppTypeRegistry] from the
/// type ID.
///
/// Components must be registered beforehand for Rust types.
//
// TODO: Somehow pass [ComponentDescriptor] to the JS side to allow automatic
// registration.
#[op(fast)]
fn op_type_registry_get_component_id_with_type_id(
    state: &mut OpState,
    world_resource_id: u32,
    type_id: &[u8],
    out: &mut [u8],
) -> bool {
    let res = bjs::runtimes::unwrap_world_resource(state, world_resource_id);
    let world = res.borrow_world();

    let type_id = bytes_to_type_id(type_id);
    match world.components().get_id(type_id) {
        Some(component_id) => {
            component_id_to_bytes(&component_id, out);
            true
        }
        None => false,
    }
}
