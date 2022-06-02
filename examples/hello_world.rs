use bevy::{prelude::*, tasks::IoTaskPool};
use bevy_js as bjs;
use bjs::{anyhow::Error, futures::channel::oneshot};

#[derive(Default)]
struct ExecutionTracker {
    pub modules: Vec<oneshot::Receiver<Result<(), Error>>>,
}

// In this example we add a counter resource and increase it's value in one
// system, while a different system prints the current count to the console.
fn main() {
    App::new()
        .add_plugins(MinimalPlugins)
        .add_plugin(bjs::JsPlugin)
        .init_resource::<ExecutionTracker>()
        .add_startup_system(setup_runtime)
        .add_system(monitor_excecution)
        .run();
}

fn setup_runtime(
    mut tracker: ResMut<ExecutionTracker>,
    mut res: NonSendMut<bjs::JsRuntimeResource>,
    tp_io: Res<IoTaskPool>,
) {
    res.init_runtime::<bjs::runtimes::BevyRuntime>();

    res.execute_script("<anon>", "Deno.core.print('BevyJS running\\n');")
        .unwrap();

    let specifier = bjs::resolve::path("./examples/hello_world.js").unwrap();
    tracker
        .modules
        .push(res.execute_module(&tp_io, specifier, None));
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
