use crate::{self as bjs, lend::RefLend, query::ComponentExt};
use bevy::{
    ecs::component::{ComponentDescriptor, ComponentId},
    prelude::World,
    utils::HashMap,
};
use bjs::{anyhow::anyhow, v8};

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

pub fn unwrap_object(value: v8::Local<v8::Value>) -> Result<v8::Local<v8::Object>, bjs::AnyError> {
    v8::Local::<v8::Object>::try_from(value).map_err(|_| anyhow!("Component must be an object"))
}

pub fn unwrap_function(
    value: v8::Local<v8::Value>,
) -> Result<v8::Local<v8::Function>, bjs::AnyError> {
    v8::Local::<v8::Function>::try_from(value)
        .map_err(|_| anyhow!("`Query` parameters must be functions"))
}

/// Unwraps field `constructor` from a JS project and asserts that its a function
pub fn unwrap_constructor<'a>(
    scope: &mut v8::HandleScope<'a>,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Result<v8::Local<'a, v8::Function>, bjs::AnyError> {
    let key_constructor = key_cache.get(scope, "constructor").into();
    object
        .get(scope, key_constructor)
        .ok_or_else(|| anyhow!("Object must define `constructor` field"))
        .and_then(unwrap_function)
}

/// Unwraps field `typeId` from a JS object
pub fn unwrap_type_id(
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

/// Unwraps field `componentId` from a JS object
fn unwrap_component_id(
    scope: &mut v8::HandleScope,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Option<ComponentId> {
    let key_component_id = key_cache.get(scope, "componentId").into();
    object
        .get(scope, key_component_id)
        .and_then(|id| v8::Local::<v8::ArrayBuffer>::try_from(id).ok())
        .map(|buffer| super::type_registry::bytes_to_component_id(as_slice(buffer)))
}

/// Extracts field `componentId` from a JS object with guaranteed reference
/// to `World`.
///
/// Will attempt to lazily extract `componentId` based on the `typeId`
pub fn extract_component_id(
    scope: &mut v8::HandleScope,
    world: &mut World,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Result<ComponentId, bjs::AnyError> {
    match unwrap_component_id(scope, key_cache, object) {
        Some(component_id) => Ok(component_id),
        None => {
            // Lazily initialize `ComponentId` if `TypeId` is defined or
            // initialize new dynamic component
            let component_id = match unwrap_type_id(scope, key_cache, object) {
                Some(type_id) => world.components().get_id(type_id).ok_or_else(|| {
                    anyhow!("Could not find `ComponentId` for type with `TypeId`, call `World::init_component` to instantiate it")
                })?,
                None => {
                    let descriptor = ComponentDescriptor::new::<ComponentExt>();
                    world.init_component_with_descriptor(descriptor)
                }
            };

            let key_component_id = key_cache.get(scope, "componentId").into();
            update_component_id(scope, key_component_id, object, component_id);

            Ok(component_id)
        }
    }
}

/// Extracts field `componentId` from a JS object
///
/// Will attempt to lazily extract `componentId` based on the `typeId`
pub fn try_extract_component_id(
    scope: &mut v8::HandleScope,
    world: &RefLend<World>,
    key_cache: &mut KeyCache,
    object: v8::Local<v8::Object>,
) -> Result<ComponentId, bjs::AnyError> {
    match unwrap_component_id(scope, key_cache, object) {
        Some(component_id) => Ok(component_id),
        None => {
            // Lazily initialize `ComponentId` if `TypeId` is defined or
            // initialize new dynamic component
            let component_id = match unwrap_type_id(scope, key_cache, object) {
                Some(type_id) => world.borrow().components().get_id(type_id).ok_or_else(|| {
                    anyhow!("Could not find `ComponentId` for type with `TypeId`, call `World::init_component` to instantiate it")
                }),
                None => {
                    let descriptor = ComponentDescriptor::new::<ComponentExt>();
                    world
                        .try_borrow_mut()
                        .map(|mut world| world.init_component_with_descriptor(descriptor)).ok_or_else(|| {
                            anyhow!("Could not dynamically initialize component as `World` cannot be borrowed mutably")
                        })
                }
            }?;

            let key_component_id = key_cache.get(scope, "componentId").into();
            update_component_id(scope, key_component_id, object, component_id);

            Ok(component_id)
        }
    }
}

pub fn update_component_id<'a>(
    scope: &mut v8::HandleScope<'a>,
    key_component_id: v8::Local<v8::Value>,
    constructor: v8::Local<v8::Object>,
    component_id: ComponentId,
) {
    let component_id = super::type_registry::component_id_to_bytes(&component_id);
    let value = super::type_registry::array_buffer(scope, Box::new(component_id));

    // Replace `ComponentId` with new `ArrayBuffer`
    constructor.set(scope, key_component_id, value.into());
}

pub fn as_slice(buffer: v8::Local<v8::ArrayBuffer>) -> &[u8] {
    let store = buffer.get_backing_store();
    unsafe { &*(&store[0..buffer.byte_length()] as *const _ as *const [u8]) }
}
