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
};
use bjs::{op, serde_v8, v8, OpState};

struct QueryStateResource<Q: WorldQuery, F: ReadOnlyWorldQuery = ()> {
    state: QueryState<Q, F>,
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

    let component_id_index = v8::String::new_from_utf8(
        scope,
        "componentId".as_ref(),
        v8::NewStringType::Internalized,
    )
    .unwrap()
    .into();

    let type_id_index =
        v8::String::new_from_utf8(scope, "typeId".as_ref(), v8::NewStringType::Internalized)
            .unwrap()
            .into();

    let mut fetch_parameters = Vec::new();

    let fetch = fetch.v8_value;
    if fetch.is_array() {
        let array = v8::Local::<v8::Array>::try_from(fetch).unwrap();
        for index in 0..array.length() {
            let value = array.get_index(scope, index).unwrap();
            let component_id =
                unwrap_component_id(scope, &world, component_id_index, type_id_index, value)?;
            fetch_parameters.push(component_id);
        }
    } else {
        let component_id =
            unwrap_component_id(scope, &world, component_id_index, type_id_index, fetch)?;
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

    let query_state_resource = QueryStateResource { state: query_state };
    Ok(state.resource_table.add(query_state_resource))
}

/// Extracts `ComponentId` from a Bevy type constructior in JS
//
// TODO: Something something KeyCache
pub(crate) fn unwrap_component_id(
    scope: &mut v8::HandleScope,
    world: &World,
    component_id_index: v8::Local<v8::Value>,
    type_id_index: v8::Local<v8::Value>,
    value: v8::Local<v8::Value>,
) -> Result<ComponentId, bjs::AnyError> {
    let object = value
        .to_object(scope)
        .ok_or_else(|| bjs::AnyError::msg("`Query` parameters must be objects".to_string()))?;

    // Check if object defines `ComponentId`
    let buffer = object
        .get(scope, component_id_index)
        .and_then(|id| serde_v8::from_v8::<serde_v8::ZeroCopyBuf>(scope, id).ok())
        .or_else(|| {
            // We can fallback here to query `ComponentId` based on `TypeId`
            //
            // TODO: This becomes unnecessary when JS can initialize components
            // by itself, but otherwise functions as a late `ComponentId`
            // initialization.
            //
            // TODO: More importantly this is necessary if
            // `World::init_component` of startup systems is allowed to run
            // before plugin initialization.
            object
                .get(scope, type_id_index)
                .and_then(|id| serde_v8::from_v8::<serde_v8::ZeroCopyBuf>(scope, id).ok())
                .and_then(|type_id| {
                    let type_id = super::type_registry::bytes_to_type_id(type_id.as_ref());
                    world.components().get_id(type_id)
                })
                .and_then(|component_id| {
                    let mut raw = [0u8; 8];
                    super::type_registry::component_id_to_bytes(&component_id, &mut raw);
                    let backing_store =
                        v8::ArrayBuffer::new_backing_store_from_boxed_slice(Box::new(raw));

                    let buffer =
                        v8::ArrayBuffer::with_backing_store(scope, &backing_store.make_shared());
                    let array_buffer = v8::Uint8Array::new(scope, buffer, 0, 8).unwrap().into();

                    // Replace `ComponentId` with new `Uint8Array`
                    object.set(scope, component_id_index, array_buffer);
                    Some(serde_v8::from_v8::<serde_v8::ZeroCopyBuf>(scope, array_buffer).unwrap())
                })
        })
        .ok_or_else(|| {
            bjs::AnyError::msg(
                "Object must define `componentId` field and it must be an `ArrayBuffer`.
            Component may not have been initialized with `World::init_component`."
                    .to_string(),
            )
        })?;

    Ok(super::type_registry::bytes_to_component_id(buffer.as_ref()))
}
