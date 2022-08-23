use bevy::prelude::*;
use bevy_js as bjs;
use bjs::runtimes::BevyRuntime;

fn main() {
    App::new()
        .add_plugins(MinimalPlugins)
        .add_plugin(bjs::JsPlugin::<BevyRuntime>::default())
        .add_startup_system(setup_runtime)
        .run();
}

fn setup_runtime(mut res: NonSendMut<bjs::JsRuntimeResource<BevyRuntime>>) {
    res.execute_script("<anon>", "Deno.core.print('BevyJS running\\n');")
        .unwrap();

    let specifier = bjs::resolve::path("./examples/hello_world.js").unwrap();
    let _ = res.execute_module(specifier, None);
}
