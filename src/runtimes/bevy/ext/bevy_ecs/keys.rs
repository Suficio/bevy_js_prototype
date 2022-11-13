use crate as bjs;
use bevy::{
    ecs::{bundle::BundleId, component::ComponentId},
    prelude::*,
    utils::HashMap,
};
use bjs::{serde_v8, v8};
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
        .map_err(|_| bjs::AnyError::msg("`Query` parameters must be functions".to_string()))
}

pub fn unwrap_constructor<'a>(
    scope: &mut v8::HandleScope<'a>,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Result<v8::Local<'a, v8::Function>, bjs::AnyError> {
    let key_constructor = key_cache.get(scope, "constructor").into();
    object
        .get(scope, key_constructor)
        .ok_or_else(|| bjs::AnyError::msg("Object must define `constructor` field".to_string()))
        .and_then(|value| unwrap_function(value))
}

pub fn unwrap_type_id(
    scope: &mut v8::HandleScope,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Option<std::any::TypeId> {
    let key_type_id = key_cache.get(scope, "typeId").into();
    object
        .get(scope, key_type_id)
        .and_then(|id| serde_v8::from_v8::<serde_v8::ZeroCopyBuf>(scope, id).ok())
        .map(|type_id| super::type_registry::bytes_to_type_id(type_id.as_ref()))
}

/// Extracts `ComponentId` from a Bevy type constructior in JS
pub fn unwrap_component_id(
    scope: &mut v8::HandleScope,
    world: &World,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Option<ComponentId> {
    // Check if object defines `ComponentId`
    let key_component_id = key_cache.get(scope, "componentId").into();
    object
        .get(scope, key_component_id)
        // TODO: Don't use serde Deserialize intermediate
        .and_then(|id| serde_v8::from_v8::<serde_v8::ZeroCopyBuf>(scope, id).ok())
        .or_else(|| {
            // We can fallback here to query `ComponentId` based on `TypeId`
            //
            // TODO: This becomes unnecessary when JS can initialize components
            // by itself, but otherwise functions as a late `ComponentId`
            // initialization.
            //
            // TODO: More importantly this is unnecessary if
            // `World::init_component` of startup systems is allowed to run
            // before plugin initialization.
            unwrap_type_id(scope, key_cache, object)
                .and_then(|type_id| world.components().get_id(type_id))
                .and_then(|component_id| {
                    let value = update_component_id(scope, key_cache, object, component_id);
                    Some(serde_v8::from_v8::<serde_v8::ZeroCopyBuf>(scope, value).unwrap())
                })
        })
        .map(|buffer| super::type_registry::bytes_to_component_id(buffer.as_ref()))
}

pub fn unwrap_bundle_id(
    scope: &mut v8::HandleScope,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Option<BundleId> {
    let key_bundle_id = key_cache.get(scope, "bundleId").into();
    object
        .get(scope, key_bundle_id)
        // TODO: Don't use serde Deserialize intermediate
        .and_then(|id| serde_v8::from_v8::<serde_v8::ZeroCopyBuf>(scope, id).ok())
        .map(|buffer| bytes_to_bundle_id(buffer.as_ref()))
}

pub fn update_component_id<'a>(
    scope: &mut v8::HandleScope<'a>,
    key_cache: &mut KeyCache,
    constructor: v8::Local<v8::Object>,
    component_id: ComponentId,
) -> v8::Local<'a, v8::Value> {
    let key_component_id = key_cache.get(scope, "componentId").into();

    let component_id = super::type_registry::component_id_to_bytes(&component_id);
    let value = super::type_registry::array_buffer(scope, Box::new(component_id));

    // Replace `ComponentId` with new `ArrayBuffer`
    constructor.set(scope, key_component_id, value);
    value
}

pub fn update_bundle_id<'a>(
    scope: &mut v8::HandleScope<'a>,
    key_cache: &mut KeyCache,
    constructor: v8::Local<v8::Object>,
    bundle_id: BundleId,
) -> v8::Local<'a, v8::Value> {
    let key_bundle_id = key_cache.get(scope, "bundleId").into();

    let bundle_id = bundle_id_to_bytes(&bundle_id);
    let value = super::type_registry::array_buffer(scope, Box::new(bundle_id));

    // Replace `BundleId` with new `ArrayBuffer`
    constructor.set(scope, key_bundle_id, value);
    value
}
