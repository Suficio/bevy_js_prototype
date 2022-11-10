use super::keys::{unwrap_component_id, unwrap_function, unwrap_type_id, KeyCache};
use crate::{
    self as bjs,
    query::{ComponentPtr, VecPtr},
};
use bevy::{
    ecs::query::{ReadOnlyWorldQuery, WorldQuery},
    prelude::*,
    reflect::ReflectFromPtr,
};
use bjs::{op, serde_v8, v8, OpState};
use std::{cell::RefCell, rc::Rc};

/// Caches [QueryState] as a Deno [Resource]
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

    let key_cache = state.borrow_mut::<KeyCache>();

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

        // TODO: TypeId may not be available for dynamically registered components
        // need to fallback to `ComponentId` implementation
        let type_id = unwrap_type_id(scope, key_cache, constructor.into())?;
        let reflect_from_ptr = registry.get_type_data::<ReflectFromPtr>(type_id).unwrap();

        let component_id = unwrap_component_id(scope, &world, key_cache, constructor.into())?;

        constructors.push((reflect_from_ptr.clone(), v8::Weak::new(scope, constructor)));
        fetch_parameters.push(component_id);
    }

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

#[op(fast)]
pub fn op_query_drop(state: &mut OpState, query_resource_id: u32) -> Result<(), bjs::AnyError> {
    // We only support one type of query therefore the [QueryStateResource]
    // type will always be correct.
    if state
        .resource_table
        .get::<QueryStateResource<(Entity, VecPtr<ComponentPtr>), ()>>(query_resource_id)
        .is_err()
    {
        return Err(bjs::AnyError::msg("Resource was not a valid Query"));
    }

    state.resource_table.close(query_resource_id)
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
    let Ok(query_state) = state
        .borrow()
        .resource_table
        .get::<QueryStateResource<(Entity, VecPtr<ComponentPtr>), ()>>(query_resource_id) else {
        return Err(bjs::AnyError::msg("Query resource was not instantiated or dropped"));
    };

    let Ok(callback_fn) = v8::Local::<v8::Function>::try_from(callback_fn.v8_value) else {
        return Err(bjs::AnyError::msg("Provided callback is not a function"));
    };

    let constructors = &query_state.constructors;
    for (entity, components) in query_state.state.borrow_mut().iter(&world) {
        debug_assert_eq!(constructors.len(), components.len());

        // Create an ArrayBuffer to send `Entity` to JS
        // TODO: Cache entities
        let entity = super::entity::entity_to_bytes(&entity);
        let entity = super::type_registry::array_buffer(scope, Box::new(entity));

        // Create arguments array
        let mut elements = Vec::with_capacity(components.len());
        for (component, (reflect_from_ptr, constructor)) in components.iter().zip(constructors) {
            // SAFE: ReflectFromPtr is for the correct TypeId
            let value = unsafe { reflect_from_ptr.as_reflect_ptr(*component) };
            let value = bjs::runtimes::bevy::ext::serialize(&registry, scope, value).unwrap();

            // TODO: Cache new instances
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
