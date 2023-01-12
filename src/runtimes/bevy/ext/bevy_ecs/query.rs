use super::keys::{self, KeyCache};
use crate::{
    self as bjs,
    lend::RefLend,
    query::{ComponentExt, ComponentPtr, Filter, VecPtr},
};
use bevy::{prelude::*, ptr::Ptr, reflect::ReflectFromPtr};
use bjs::{op, serde_v8, v8, OpState};
use std::{cell::RefCell, rc::Rc};

/// Caches filter constructors
#[derive(Clone)]
struct FilterResource {
    with: v8::Weak<v8::Function>,
    without: v8::Weak<v8::Function>,
}

impl FilterResource {
    fn extract(
        &self,
        scope: &mut v8::HandleScope,
        world: &RefLend<World>,
        key_cache: &mut KeyCache,
        filter: v8::Local<v8::Object>,
    ) -> Result<Filter, bjs::AnyError> {
        let function = keys::extract_constructor(scope, key_cache, filter)?;

        let key = key_cache.get(scope, "componentType").into();
        let component = filter
            .get(scope, key)
            .ok_or_else(|| bjs::AnyError::msg("Filter parameter must define `componentType` field"))
            .and_then(keys::unwrap_object)?;

        let component_id = keys::extract_component_id(scope, world, key_cache, component)?;

        if function == self.with.to_local(scope).unwrap() {
            Ok(Filter::With(component_id))
        } else if function == self.without.to_local(scope).unwrap() {
            Ok(Filter::Without(component_id))
        } else {
            Err(bjs::AnyError::msg(
                "Filter parameter constructor must match a filter constructor",
            ))
        }
    }
}

/// Caches [QueryState] as a Deno [Resource]
struct QueryStateResource {
    state: RefCell<QueryState<(Entity, VecPtr<ComponentPtr>), VecPtr<Filter>>>,
    constructors: Vec<Option<(ReflectFromPtr, v8::Weak<v8::Function>)>>,
}

impl bjs::Resource for QueryStateResource {}

#[op(v8)]
pub fn op_declare_filters(
    state: &mut OpState,
    scope: &mut v8::HandleScope,
    with: serde_v8::Value,
    without: serde_v8::Value,
) -> Result<(), bjs::AnyError> {
    let res = FilterResource {
        with: v8::Weak::new(scope, keys::unwrap_function(with.v8_value)?),
        without: v8::Weak::new(scope, keys::unwrap_function(without.v8_value)?),
    };
    Ok(state.put(res))
}

#[op(v8)]
pub fn op_query_initialize(
    state: &mut OpState,
    scope: &mut v8::HandleScope,
    world_resource_id: u32,
    fetch: serde_v8::Value,
    filters: serde_v8::Value,
) -> Result<u32, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, world_resource_id);
    let world = res.world();

    let registry = world.borrow().resource::<AppTypeRegistry>().clone();
    let registry = registry.read();

    let filter_cache = state.borrow::<FilterResource>().clone();
    let key_cache = state.borrow_mut::<KeyCache>();

    let fetch = match v8::Local::<v8::Array>::try_from(fetch.v8_value) {
        Ok(array) => {
            Vec::from_iter((0..array.length()).map(|index| array.get_index(scope, index).unwrap()))
        }
        Err(_) => vec![fetch.v8_value],
    };

    let filters = match v8::Local::<v8::Array>::try_from(filters.v8_value) {
        Ok(array) => {
            Vec::from_iter((0..array.length()).map(|index| array.get_index(scope, index).unwrap()))
        }
        Err(_) => vec![filters.v8_value],
    };

    let mut constructors = Vec::new();
    let mut fetch_parameters = Vec::new();
    for value in fetch {
        // Expect type constructor as fetch parameter
        let constructor = keys::unwrap_function(value)?;

        let component_id = keys::extract_component_id(scope, world, key_cache, constructor.into())?;

        // TypeId may not be available for dynamically registered components
        // need to fallback to `ComponentId` implementation
        match keys::extract_type_id(scope, key_cache, constructor.into()) {
            Some(type_id) => {
                let reflect_from_ptr = registry.get_type_data::<ReflectFromPtr>(type_id).unwrap();
                constructors.push(Some((
                    reflect_from_ptr.clone(),
                    v8::Weak::new(scope, constructor),
                )));
            }
            None => constructors.push(None),
        }

        fetch_parameters.push(component_id);
    }

    let mut filter_parameters = Vec::new();
    for value in filters {
        // Expect object as filter parameter
        let filter = keys::unwrap_object(value)?;
        let filter = filter_cache.extract(scope, world, key_cache, filter)?;
        filter_parameters.push(filter);
    }

    let query_state = unsafe {
        QueryState::new_with_state(
            &mut world.borrow_mut(),
            ((), fetch_parameters),
            filter_parameters,
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
        .get::<QueryStateResource>(query_resource_id)
        .is_err()
    {
        return Err(bjs::AnyError::msg("Resource was not a valid `Query`"));
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
    let world = res.world().borrow();

    let registry = world.resource::<AppTypeRegistry>().clone();
    let registry = registry.read();

    // We only support one type of query therefore the [QueryStateResource]
    // type will always be correct.
    let Ok(query_state) = state
        .borrow()
        .resource_table
        .get::<QueryStateResource>(query_resource_id) else {
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
        for (component, constructor) in components.iter().zip(constructors) {
            match constructor {
                Some((reflect_from_ptr, constructor)) => {
                    let value = unsafe { reflect_from_ptr.as_reflect_ptr(*component) };
                    let value =
                        bjs::runtimes::bevy::ext::serialize(&registry, scope, value).unwrap();

                    // TODO: Cache new instances
                    let typed_value = constructor
                        .to_local(scope)
                        .unwrap()
                        .new_instance(scope, &[value])
                        .unwrap();

                    elements.push(typed_value.into());
                }
                // If typed is not available, the component does not originate
                // from Rust and is already a JS object
                None => {
                    let component = unsafe { Ptr::deref::<ComponentExt>(*component) };
                    elements.push(v8::Local::new(scope, &component.0))
                }
            }
        }

        // Create array from arguments, ensures that calls are monomorphic
        let args = v8::Array::new_with_elements(scope, elements.as_slice());
        let null = v8::null(scope).into();
        callback_fn.call(scope, null, &[entity.into(), args.into()]);
    }

    Ok(())
}
