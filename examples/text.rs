use bevy::prelude::*;
use bevy_js::{self as bjs, runtimes::BevyRuntime};

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugin(bjs::JsPlugin::<BevyRuntime>::default())
        .add_startup_system(|mut commands: Commands| {
            // UI camera
            commands.spawn_bundle(Camera2dBundle::default());
        })
        .add_startup_system(setup_runtime)
        // Register missing reflectable types
        .register_type::<Vec<TextSection>>()
        .register_type::<TextStyle>()
        .run();
}

fn setup_runtime(mut runtime: NonSendMut<bjs::JsRuntimeResource<BevyRuntime>>) {
    let specifier = bjs::resolve::path("./examples/text.js").unwrap();
    let _ = runtime.execute_module(specifier.clone(), None);
}
