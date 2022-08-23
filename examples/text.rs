use bevy::{prelude::*, reflect::TypeRegistry};
use bevy_js::{self as bjs, runtimes::BevyRuntime};

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugin(bjs::JsPlugin::<BevyRuntime>::default())
        .add_startup_system(|mut commands: Commands| {
            // UI camera
            commands.spawn_bundle(Camera2dBundle::default());
        })
        .add_startup_system_to_stage(StartupStage::PreStartup, setup_ui.exclusive_system())
        .add_startup_system_to_stage(StartupStage::Startup, setup_runtime)
        .run();
}

fn setup_runtime(
    mut runtime: NonSendMut<bjs::JsRuntimeResource<BevyRuntime>>,
    inspector: Res<bjs::inspector::JsInspector>,
) {
    let specifier = bjs::resolve::path("./examples/text.js").unwrap();
    let _ = runtime.execute_module(specifier.clone(), None);

    runtime.register_inspector(specifier, inspector.meta());
}

fn register_component(
    world: &mut World,
    type_registry: &TypeRegistry,
    entity: Entity,
    component: &dyn Reflect,
) {
    let type_registry = type_registry.read();
    if let Some(component_impl) =
        type_registry.get_type_data::<ReflectComponent>(component.type_id())
    {
        component_impl.insert(world, entity, component)
    }
}

fn setup_ui(world: &mut World) {
    let entity = world.spawn().id();

    let asset_server = world.resource::<AssetServer>().clone();
    let type_registry = world.resource::<AppTypeRegistry>().clone();

    let text: Box<dyn Reflect> = Box::new(Text::from_section(
        "hello\nbevy!",
        TextStyle {
            font: asset_server.load("fonts/FiraSans-Bold.ttf"),
            font_size: 100.0,
            color: Color::WHITE,
        },
    ));

    register_component(world, &type_registry, entity, text.as_reflect());
}
