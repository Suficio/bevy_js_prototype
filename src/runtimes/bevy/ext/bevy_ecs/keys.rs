use crate::{self as bjs, lend::RefLend, query::ComponentExt};
use bevy::{
    ecs::{
        bundle::BundleId,
        component::{ComponentDescriptor, ComponentId},
    },
    prelude::World,
    utils::HashMap,
};
use bjs::v8;
use std::{mem, slice};

fn bundle_id_to_bytes(bundle_id: &BundleId) -> [u8; 8] {
    let mut out = [0; 8];
    unsafe {
        out.copy_from_slice(slice::from_raw_parts(
            (bundle_id as *const BundleId) as *const u8,
            mem::size_of::<ComponentId>(),
        ));
    };
    out
}

fn bytes_to_bundle_id(bundle_id: &[u8]) -> BundleId {
    unsafe {
        let mut out = [0u8; mem::size_of::<BundleId>()];
        out.clone_from_slice(bundle_id);
        mem::transmute(out)
    }
}

/// KeyCache stores a pool struct keys mapped to v8,
/// to minimize allocs and speed up decoding/encoding `v8::Object`s
#[derive(Default)]
pub struct KeyCache(HashMap<&'static str, v8::Global<v8::String>>);

impl KeyCache {
    pub fn get<'a>(
        &mut self,
        scope: &mut v8::HandleScope<'a>,
        key: &'static str,
    ) -> v8::Local<'a, v8::String> {
        let global = self.0.entry(key).or_insert_with(|| {
            let string = v8::String::new_external_onebyte_static(scope, key.as_bytes()).unwrap();
            v8::Global::new(scope, string)
        });

        v8::Local::new(scope, &*global)
    }
}

pub fn unwrap_object<'a>(
    value: v8::Local<'a, v8::Value>,
) -> Result<v8::Local<'a, v8::Object>, bjs::AnyError> {
    v8::Local::<v8::Object>::try_from(value)
        .map_err(|_| bjs::AnyError::msg("Component must be an object"))
}

pub fn unwrap_function<'a>(
    value: v8::Local<'a, v8::Value>,
) -> Result<v8::Local<'a, v8::Function>, bjs::AnyError> {
    v8::Local::<v8::Function>::try_from(value)
        .map_err(|_| bjs::AnyError::msg("`Query` parameters must be functions"))
}

/// Extracts field `constructor` from a JS project
pub fn extract_constructor<'a>(
    scope: &mut v8::HandleScope<'a>,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Result<v8::Local<'a, v8::Function>, bjs::AnyError> {
    let key_constructor = key_cache.get(scope, "constructor").into();
    object
        .get(scope, key_constructor)
        .ok_or_else(|| bjs::AnyError::msg("Object must define `constructor` field"))
        .and_then(|value| unwrap_function(value))
}

/// Extracts field `typeId` from a JS object
pub fn extract_type_id(
    scope: &mut v8::HandleScope,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Option<std::any::TypeId> {
    let key_type_id = key_cache.get(scope, "typeId").into();
    object
        .get(scope, key_type_id)
        .and_then(|id| v8::Local::<v8::ArrayBuffer>::try_from(id).ok())
        .map(|type_id| super::type_registry::bytes_to_type_id(as_slice(type_id)))
}

/// Extracts field `componentId` from a JS object
///
/// Will attempt to lazily extract `componentId` based on the `typeId`
pub fn extract_component_id(
    scope: &mut v8::HandleScope,
    world: &RefLend<World>,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Result<ComponentId, bjs::AnyError> {
    // Check if object defines `ComponentId`
    let key_component_id = key_cache.get(scope, "componentId").into();
    object
        .get(scope, key_component_id)
        .and_then(|id| v8::Local::<v8::ArrayBuffer>::try_from(id).ok())
        .map(|buffer| super::type_registry::bytes_to_component_id(as_slice(buffer)))
        .or_else(|| {
            // Lazily initialize `ComponentId` if `TypeId` is defined or
            // initialize new dynamic component
            let component_id = match extract_type_id(scope, key_cache, object) {
                Some(type_id) => world
                    .try_borrow()
                    .and_then(|world| world.components().get_id(type_id)),
                None => world.try_borrow_mut().map(|mut world| {
                    let descriptor = ComponentDescriptor::new::<ComponentExt>();
                    world.init_component_with_descriptor(descriptor)
                }),
            };

            if let Some(component_id) = component_id {
                update_component_id(scope, key_cache, object, component_id);
            }

            component_id
        })
        .ok_or_else(|| {
            bjs::AnyError::msg("Component was not initialized, call `world::init_component`")
        })
}

/// Extracts field `bundleId` from a JS object
pub fn extract_bundle_id(
    scope: &mut v8::HandleScope,
    world: &RefLend<World>,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Result<BundleId, bjs::AnyError> {
    let key_bundle_id = key_cache.get(scope, "bundleId").into();
    object
        .get(scope, key_bundle_id)
        .and_then(|id| v8::Local::<v8::ArrayBuffer>::try_from(id).ok())
        .map(|buffer| bytes_to_bundle_id(as_slice(buffer)))
        .or_else(|| {
            extract_component_id(scope, world, key_cache, object)
                .ok()
                .and_then(|component_id| {
                    world.try_borrow_mut().map(|mut world| {
                        let bundle_id = world.init_dynamic_bundle(vec![component_id]).id();
                        update_bundle_id(scope, key_cache, object, bundle_id);
                        bundle_id
                    })
                })
        })
        .ok_or_else(|| {
            bjs::AnyError::msg("Component was not initialized, call `world::init_component`")
        })
}

pub fn update_component_id<'a>(
    scope: &mut v8::HandleScope<'a>,
    key_cache: &mut KeyCache,
    constructor: v8::Local<v8::Object>,
    component_id: ComponentId,
) -> v8::Local<'a, v8::ArrayBuffer> {
    let key_component_id = key_cache.get(scope, "componentId").into();

    let component_id = super::type_registry::component_id_to_bytes(&component_id);
    let value = super::type_registry::array_buffer(scope, Box::new(component_id));

    // Replace `ComponentId` with new `ArrayBuffer`
    constructor.set(scope, key_component_id, value.into());
    value
}

pub fn update_bundle_id<'a>(
    scope: &mut v8::HandleScope<'a>,
    key_cache: &mut KeyCache,
    constructor: v8::Local<v8::Object>,
    bundle_id: BundleId,
) -> v8::Local<'a, v8::ArrayBuffer> {
    let key_bundle_id = key_cache.get(scope, "bundleId").into();

    let bundle_id = bundle_id_to_bytes(&bundle_id);
    let value = super::type_registry::array_buffer(scope, Box::new(bundle_id));

    // Replace `BundleId` with new `ArrayBuffer`
    constructor.set(scope, key_bundle_id, value.into());
    value
}

pub fn as_slice<'s>(buffer: v8::Local<'s, v8::ArrayBuffer>) -> &'s [u8] {
    let store = buffer.get_backing_store();
    unsafe { &*(&store[0..buffer.byte_length()] as *const _ as *const [u8]) }
}
