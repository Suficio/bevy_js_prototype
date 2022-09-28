use bevy::prelude::*;
use bevy_js::{self as bjs, runtimes::BevyRuntime};

fn main() {
    App::new()
        .add_plugins(MinimalPlugins)
        .add_plugin(bjs::JsPlugin::<BevyRuntime>::default())
        .add_startup_system(setup_runtime)
        .run();
}

fn setup_runtime(
    runtime: NonSend<bjs::JsRuntimeResource<BevyRuntime>>,
    inspector: Res<bjs::inspector::JsInspector>,
) {
    runtime.register_inspector(inspector.meta());
}
