//! Demonstrates a startup system (one that runs once when the app starts up).

use bevy::{log::LogPlugin, prelude::*};
use bevy_js::{self as bjs, runtimes::BevyRuntime};

fn main() {
    App::new()
        .add_plugins(MinimalPlugins)
        .add_plugin(LogPlugin::default())
        .add_plugin(bjs::JsPlugin::<BevyRuntime>::default())
        .add_startup_system(setup_runtime)
        .run();
}

fn setup_runtime(res: NonSend<bjs::JsRuntimeResource<BevyRuntime>>) {
    let specifier = bjs::resolve::path("./examples/startup_system.js").unwrap();
    let _ = res.execute_module(specifier, None);
}
