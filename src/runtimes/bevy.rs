use crate as bjs;
use bevy::{
    prelude::*,
    reflect::{serde::UntypedReflectDeserializer, TypeRegistry},
};
use dc::{anyhow::Error as AnyError, op, serde::de::DeserializeSeed, serde_json::Value, OpState};
use deno_core as dc;
use std::{cell::RefCell, rc::Rc};

/// Represents the default `bevy_js` [JsRuntime](bjs::JsRuntime) which provides
/// methods to interact with `Bevy` [Worlds](bevy::prelude::World).
pub struct BevyRuntime;

impl BevyRuntime {
    /// Provides a reference to the builder before it was used to construct
    /// [BevyRuntime]. Useful for extending the runtime to your needs.
    pub fn builder() -> bjs::JsRuntimeBuilder {
        let extension = bjs::Extension::builder()
            .js(bjs::include_js_files!(
                prefix "bevy:core",
                "../../03_reflect.js",
                "../../04_ecs.js",
            ))
            .ops(vec![
                op_request_system::decl(),
                entity::op_entity_spawn::decl(),
                entity::op_entity_insert_component::decl(),
            ])
            .build();

        let mut builder = bjs::JsRuntime::builder();
        builder
            .with_module_loader(Rc::new(bjs::FsModuleLoader))
            .with_extension(extension);

        builder
    }
}

impl bjs::IntoRuntime for BevyRuntime {
    fn runtime(_world: &mut World) -> bjs::JsRuntime {
        Self::builder().build()
    }
}

#[op]
async fn op_request_system(
    state: Rc<RefCell<OpState>>,
    rid: bjs::ResourceId,
) -> Result<(), AnyError> {
    bjs::runtimes::unwrap_bevy_resource(&state, rid)
        .wait_for_world()
        .await
}

mod entity {
    use super::*;

    #[op]
    pub fn op_entity_spawn(state: Rc<RefCell<OpState>>, rid_world: bjs::ResourceId) -> u64 {
        let res = bjs::runtimes::unwrap_bevy_resource(&state, rid_world);
        let world = res.world_mut();

        world.spawn().id().to_bits()
    }

    #[op]
    pub fn op_entity_insert_component(
        state: Rc<RefCell<OpState>>,
        rid_world: bjs::ResourceId,
        e_entity: u64,
        component: Value,
    ) -> Result<(), AnyError> {
        let res = bjs::runtimes::unwrap_bevy_resource(&state, rid_world);

        let world = res.world_mut();
        let e_entity = Entity::from_bits(e_entity);

        let type_registry = world.resource::<TypeRegistry>().clone();
        let type_registry = type_registry.read();
        let reflect_deserializer = UntypedReflectDeserializer::new(&type_registry);

        let component = reflect_deserializer.deserialize(&component)?;

        // TODO: Should remove this lookup by allowing type_id to be passed to deserializer
        let type_name = component.type_name();
        let registration = type_registry
            .get_with_name(type_name)
            .ok_or(AnyError::msg(format!(
                "Could not find type registration for {}",
                type_name
            )))?;

        if let Some(component_impl) =
            type_registry.get_type_data::<ReflectComponent>(registration.type_id())
        {
            component_impl.add_component(world, e_entity, component.as_reflect());
        }

        Ok(())
    }
}
