use bevy::prelude::*;
use bevy_js as bjs;
use bjs::{anyhow::Error, futures::channel::oneshot, runtimes::BevyRuntime};

#[derive(Default)]
struct ExecutionTracker {
    pub modules: Vec<oneshot::Receiver<Result<(), Error>>>,
}

// In this example we add a counter resource and increase it's value in one
// system, while a different system prints the current count to the console.
fn main() {
    App::new()
        .add_plugins(MinimalPlugins)
        .add_plugin(bjs::JsPlugin::<BevyRuntime>::default())
        .init_resource::<ExecutionTracker>()
        .add_startup_system(setup_runtime)
        .add_system(monitor_excecution)
        .run();
}

fn setup_runtime(
    mut tracker: ResMut<ExecutionTracker>,
    mut res: NonSendMut<bjs::JsRuntimeResource<BevyRuntime>>,
) {
    res.execute_script("<anon>", "Deno.core.print('BevyJS running\\n');")
        .unwrap();

    let specifier = bjs::resolve::path("./examples/hello_world.js").unwrap();
    tracker.modules.push(res.execute_module(specifier, None));
}

fn monitor_excecution(mut tracker: ResMut<ExecutionTracker>) {
    tracker.modules.retain_mut(|module| {
        match module.try_recv() {
            Ok(Some(Ok(_))) => println!("Done"),
            Ok(Some(Err(err))) => println!("{}", err),
            Err(_) => println!("Canceled"),
            Ok(None) => return true,
        };

        return false;
    })
}
