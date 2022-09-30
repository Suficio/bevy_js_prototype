use bevy::prelude::*;
use bevy_js::{self as bjs, runtimes::BevyRuntime};

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugin(bjs::JsPlugin::<BevyRuntime>::default())
        .add_startup_system(|mut commands: Commands| {
            // UI camera
            commands.spawn(Camera2dBundle::default());
        })
        .add_startup_system(setup_runtime)
        .run();
}

fn setup_runtime(mut runtime: NonSendMut<bjs::JsRuntimeResource<BevyRuntime>>) {
    let specifier = bjs::resolve::path("./examples/text.js").unwrap();
    let _ = runtime.execute_module(specifier, None);
}
