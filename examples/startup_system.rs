//! Demonstrates a startup system (one that runs once when the app starts up).

use bevy::{prelude::*, tasks::IoTaskPool};
use bevy_js as bjs;

fn main() {
    App::new()
        .add_plugins(MinimalPlugins)
        .add_plugin(bjs::JsPlugin)
        .add_startup_system(setup_runtime)
        .run();
}

fn setup_runtime(mut res: NonSendMut<bjs::JsRuntimeResource>, tp_io: Res<IoTaskPool>) {
    res.init_runtime::<bjs::runtimes::BevyRuntime>();
    let specifier = bjs::resolve::path("./examples/startup_system.js").unwrap();
    let _ = res.execute_module(&tp_io, specifier, None);
}
