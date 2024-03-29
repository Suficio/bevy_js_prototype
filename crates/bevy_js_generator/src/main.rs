//! Generates JavaScript definitions for Bevy reflect types

use bevy::{prelude::*, reflect::TypeRegistryInternal};
use gumdrop::Options;
use std::collections::HashMap;
use std::{
    fs::{self, File},
    io::Write as _,
    path::{Path, PathBuf},
    process::Command,
};

use generate::generate_type;
use module::Module;
use utils::{evaluate_dependency_order, file_path};

mod generate;
mod module;
mod utils;

#[derive(Debug, Options)]
struct GeneratorOptions {
    #[options(help = "print help message")]
    help: bool,
    #[options(help = "prettify generated files")]
    prettify: bool,
    #[options(help = "target directory", default = "../../src/runtimes/bevy/ext")]
    target: PathBuf,
    #[options(
        help = "used to set the level that generated modules are loaded after",
        default = "2"
    )]
    level: usize,
}

fn generate_modules(
    opts: &GeneratorOptions,
    type_registry: &TypeRegistryInternal,
) -> Vec<(String, Module)> {
    let mut modules = HashMap::<String, Module>::default();

    for registration in type_registry.iter() {
        let path = file_path(registration.type_name());
        let structure = modules
            .entry(path)
            .or_insert_with_key(|p| Module::new(p.clone()));

        generate_type(type_registry, structure, registration);
    }

    let mut modules = modules
        .into_values()
        .filter(|m| !m.is_empty())
        .collect::<Vec<Module>>();

    // Register additional dependencies
    modules.push(Module::new("bevy_ecs".to_string()));

    evaluate_dependency_order(modules, opts.level)
}

fn generate(opts: &GeneratorOptions, type_registry: &TypeRegistryInternal) {
    let mut tasks = Vec::default();

    let dependencies = generate_modules(opts, type_registry);
    for (path, module) in dependencies.iter() {
        if module.is_empty() {
            continue;
        }

        let mut p = opts.target.join(path);
        p.set_extension("js");
        let p = Path::new(&p);

        fs::create_dir_all(p.parent().unwrap()).unwrap();
        let mut f = File::create(p).unwrap();

        writeln!(&mut f, r#""use strict";"#).unwrap();
        writeln!(&mut f, r#"((window) => {{"#).unwrap();

        module.write(&mut f);

        writeln!(&mut f, r#"}})(globalThis)"#).unwrap();

        // For good measure, fire off a beautify command
        if opts.prettify {
            tasks.push(
                Command::new("npx.cmd")
                    .args(["prettier", "--write"])
                    .arg(p)
                    .spawn()
                    .unwrap(),
            )
        }
    }

    for mut task in tasks.drain(..) {
        task.wait().unwrap();
    }
}

fn main() {
    let opts = GeneratorOptions::parse_args_default_or_exit();

    let mut app = App::new();
    app.add_plugins(DefaultPlugins);

    let world = app.world;
    let type_registry = world
        .get_resource::<AppTypeRegistry>()
        .expect("Type registry not registered by Bevy")
        .read();

    generate(&opts, &type_registry);
}
