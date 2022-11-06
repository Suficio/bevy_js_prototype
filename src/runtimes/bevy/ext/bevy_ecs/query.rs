use crate::{
    self as bjs,
    query::{ComponentPtr, VecPtr},
};
use bevy::{
    ecs::{
        component::ComponentId,
        query::{ReadOnlyWorldQuery, WorldQuery},
    },
    prelude::*,
    reflect::ReflectFromPtr,
};
use bjs::{op, serde_v8, v8, OpState};
use std::{any::TypeId, cell::RefCell, rc::Rc};

struct QueryStateResource<Q: WorldQuery, F: ReadOnlyWorldQuery = ()> {
    state: RefCell<QueryState<Q, F>>,
    constructors: Vec<(ReflectFromPtr, v8::Weak<v8::Function>)>,
}

impl<Q, F> bjs::Resource for QueryStateResource<Q, F>
where
    Q: WorldQuery + 'static,
    F: ReadOnlyWorldQuery + 'static,
{
}

#[op(v8)]
pub fn op_query_initialize(
    state: &mut OpState,
    scope: &mut v8::HandleScope,
    world_resource_id: u32,
    fetch: serde_v8::Value,
    _filter: serde_v8::Value,
) -> Result<u32, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, world_resource_id);
    let mut world = res.borrow_world_mut();

    let registry = world.resource::<AppTypeRegistry>().clone();
    let registry = registry.read();

    // TODO: KeyCache
    let component_id_index = v8::String::new_from_utf8(
        scope,
        "componentId".as_ref(),
        v8::NewStringType::Internalized,
    )
    .unwrap()
    .into();

    // TODO: KeyCache
    let type_id_index =
        v8::String::new_from_utf8(scope, "typeId".as_ref(), v8::NewStringType::Internalized)
            .unwrap()
            .into();

    let parameters = match v8::Local::<v8::Array>::try_from(fetch.v8_value) {
        Ok(array) => {
            Vec::from_iter((0..array.length()).map(|index| array.get_index(scope, index).unwrap()))
        }
        Err(_) => vec![fetch.v8_value],
    };

    let mut constructors = Vec::new();
    let mut fetch_parameters = Vec::new();
    for value in parameters {
        let constructor = unwrap_function(value)?;

        let type_id = unwrap_type_id(scope, type_id_index, constructor.into())?;
        let reflect_from_ptr = registry.get_type_data::<ReflectFromPtr>(type_id).unwrap();

        let component_id = unwrap_component_id(
            scope,
            &world,
            component_id_index,
            type_id_index,
            constructor.into(),
        )?;

        constructors.push((reflect_from_ptr.clone(), v8::Weak::new(scope, constructor)));
        fetch_parameters.push(component_id);
    }

    dbg!(&fetch_parameters);

    let query_state = unsafe {
        QueryState::<(Entity, VecPtr<ComponentPtr>), ()>::new_with_state(
            &mut world,
            ((), fetch_parameters),
            (),
        )
    };

    // Once we have a `QueryState` we can store it as a resource and return
    // the handle to the user in JS

    let query_state_resource = QueryStateResource {
        state: RefCell::new(query_state),
        constructors,
    };

    Ok(state.resource_table.add(query_state_resource))
}

#[op(v8)]
pub fn op_query_iter(
    state: Rc<RefCell<OpState>>,
    scope: &mut v8::HandleScope,
    world_resource_id: u32,
    query_resource_id: u32,
    callback_fn: serde_v8::Value,
) -> Result<(), bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(&state.borrow(), world_resource_id);
    let world = res.borrow_world();

    let registry = world.resource::<AppTypeRegistry>().clone();
    let registry = registry.read();

    let this = v8::undefined(scope).into();

    // We only support one type of query therefore the [QueryStateResource]
    // type will always be correct.
    let query_state = state
        .borrow()
        .resource_table
        .get::<QueryStateResource<(Entity, VecPtr<ComponentPtr>), ()>>(query_resource_id)
        .unwrap();

    let Ok(callback_fn) = v8::Local::<v8::Function>::try_from(callback_fn.v8_value) else {
        return Err(bjs::AnyError::msg("Provided callback is not a function"));
    };

    let constructors = &query_state.constructors;
    for (entity, components) in query_state.state.borrow_mut().iter(&world) {
        debug_assert_eq!(constructors.len(), components.len());

        // Create an ArrayBuffer to send `Entity` to JS
        let entity = super::entity::entity_to_bytes(&entity);
        let entity = super::type_registry::array_buffer(scope, Box::new(entity));

        // Create arguments array
        let mut elements = Vec::with_capacity(components.len());
        for (component, (reflect_from_ptr, constructor)) in components.iter().zip(constructors) {
            // SAFE: ReflectFromPtr is for the correct TypeId
            let value = unsafe { reflect_from_ptr.as_reflect_ptr(*component) };
            let value = bjs::runtimes::bevy::ext::serialize(&registry, scope, value).unwrap();

            let typed_value = constructor
                .to_local(scope)
                .unwrap()
                .new_instance(scope, &[value])
                .unwrap();

            elements.push(typed_value.into());
        }

        // Create array from arguments, ensures that calls are monomorphic
        let args = v8::Array::new_with_elements(scope, elements.as_slice());
        callback_fn.call(scope, this, &[entity, args.into()]);
    }

    Ok(())
}

fn unwrap_function<'a>(
    value: v8::Local<'a, v8::Value>,
) -> Result<v8::Local<'a, v8::Function>, bjs::AnyError> {
    v8::Local::<v8::Function>::try_from(value)
        .map_err(|_| bjs::AnyError::msg("`Query` parameters must be functions".to_string()))
}

fn unwrap_type_id(
    scope: &mut v8::HandleScope,
    type_id_index: v8::Local<v8::Value>,
    object: v8::Local<v8::Object>,
) -> Result<TypeId, bjs::AnyError> {
    object
        .get(scope, type_id_index)
        .and_then(|id| serde_v8::from_v8::<serde_v8::ZeroCopyBuf>(scope, id).ok())
        .map(|type_id| super::type_registry::bytes_to_type_id(type_id.as_ref()))
        .ok_or_else(|| bjs::AnyError::msg("Constructor must define `typeId` field".to_string()))
}

/// Extracts `ComponentId` from a Bevy type constructior in JS
//
// TODO: Something something KeyCache
fn unwrap_component_id(
    scope: &mut v8::HandleScope,
    world: &World,
    component_id_index: v8::Local<v8::Value>,
    type_id_index: v8::Local<v8::Value>,
    object: v8::Local<v8::Object>,
) -> Result<ComponentId, bjs::AnyError> {
    // Check if object defines `ComponentId`
    object
        .get(scope, component_id_index)
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
            unwrap_type_id(scope, type_id_index, object)
                .ok()
                .and_then(|type_id| world.components().get_id(type_id))
                .and_then(|component_id| {
                    let component_id = super::type_registry::component_id_to_bytes(&component_id);
                    let value = super::type_registry::array_buffer(scope, Box::new(component_id));

                    // Replace `ComponentId` with new `ArrayBuffer`
                    object.set(scope, component_id_index, value);
                    Some(serde_v8::from_v8::<serde_v8::ZeroCopyBuf>(scope, value).unwrap())
                })
        })
        .map(|buffer| super::type_registry::bytes_to_component_id(buffer.as_ref()))
        .ok_or_else(|| {
            bjs::AnyError::msg(
                "Object must define `componentId` field and it must be an `ArrayBuffer`.
                Component may not have been initialized with `World::init_component`."
                    .to_string(),
            )
        })
}
