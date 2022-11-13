//! Handles operations on the TypeRegistry of a World

use crate as bjs;
use bevy::{ecs::component::ComponentId, prelude::*, reflect::TypeRegistration};
use bjs::{op, serde_v8, v8, OpState};
use deno_core::ZeroCopyBuf;
use std::{any::TypeId, cell::RefCell, mem, rc::Rc, slice};

pub(crate) fn type_id_to_bytes(type_id: &TypeId) -> [u8; 8] {
    let mut out = [0; 8];
    unsafe {
        out.copy_from_slice(slice::from_raw_parts(
            (type_id as *const TypeId) as *const u8,
            mem::size_of::<TypeId>(),
        ));
    };
    out
}

pub(crate) fn bytes_to_type_id(type_id: &[u8]) -> TypeId {
    unsafe {
        let mut out = [0u8; mem::size_of::<TypeId>()];
        out.clone_from_slice(type_id);
        mem::transmute(out)
    }
}

pub(crate) fn component_id_to_bytes(component_id: &ComponentId) -> [u8; 8] {
    let mut out = [0; 8];
    unsafe {
        out.copy_from_slice(slice::from_raw_parts(
            (component_id as *const ComponentId) as *const u8,
            mem::size_of::<ComponentId>(),
        ));
    };
    out
}

pub(crate) fn bytes_to_component_id(component_id: &[u8]) -> ComponentId {
    unsafe {
        let mut out = [0u8; mem::size_of::<ComponentId>()];
        out.clone_from_slice(component_id);
        mem::transmute(out)
    }
}

pub(crate) fn array_buffer<'a>(
    scope: &mut v8::HandleScope<'a>,
    id: Box<[u8]>,
) -> v8::Local<'a, v8::Value> {
    let backing_store = v8::ArrayBuffer::new_backing_store_from_boxed_slice(id);
    v8::ArrayBuffer::with_backing_store(scope, &backing_store.make_shared()).into()
}

/// Returns [TypeId] from type registration in [AppTypeRegistry] from the type
/// name.
#[op(v8)]
fn op_type_registry_get_type_id_with_name<'a>(
    state: Rc<RefCell<OpState>>,
    scope: &mut v8::HandleScope<'a>,
    world_resource_id: u32,
    type_name: serde_v8::Value,
) -> Result<serde_v8::Value<'a>, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(&state.borrow(), world_resource_id);
    let world = res.borrow_world();

    let registry = world.resource::<AppTypeRegistry>().clone();
    let registry = registry.read();

    let type_name = type_name
        .v8_value
        .to_string(scope)
        .map(|s| serde_v8::to_utf8(s, scope))
        .ok_or_else(|| {
            bjs::AnyError::msg(format!(
                "Provided type name must be a `String` or `StringObject`",
            ))
        })?;

    let type_id = registry
        .get_with_name(&type_name)
        .map(TypeRegistration::type_id)
        .map(|type_id| array_buffer(scope, Box::new(type_id_to_bytes(&type_id))))
        .unwrap_or_else(|| v8::null(scope).into());

    Ok(type_id.into())
}

/// Returns [ComponentId] from type registration in [AppTypeRegistry] from the
/// type ID.
///
/// Components must be registered beforehand for Rust types.
//
// TODO: Somehow pass [ComponentDescriptor] to the JS side to allow automatic
// registration.
#[op(v8)]
fn op_type_registry_get_component_id_with_type_id<'a>(
    state: Rc<RefCell<OpState>>,
    scope: &mut v8::HandleScope<'a>,
    world_resource_id: u32,
    type_id: ZeroCopyBuf,
) -> serde_v8::Value<'a> {
    let res = bjs::runtimes::unwrap_world_resource(&state.borrow(), world_resource_id);
    let world = res.borrow_world();

    world
        .components()
        .get_id(bytes_to_type_id(type_id.as_ref()))
        .map(|component_id| array_buffer(scope, Box::new(component_id_to_bytes(&component_id))))
        .unwrap_or_else(|| v8::null(scope).into())
        .into()
}
