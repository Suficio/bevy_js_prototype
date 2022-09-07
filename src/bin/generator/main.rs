//! Generates JavaScript definition files for ECS Entities from Bevy TypeRegistry

use bevy::{
    ecs::schedule::graph_utils::{build_dependency_graph, topological_order},
    prelude::*,
    reflect::TypeRegistryInternal,
    utils::hashbrown::HashMap,
};
use bevy_js::anyhow::Error as AnyError;
use generate::generate_type;
use gumdrop::Options;
use module::Module;
use std::{
    fs::{self, File},
    io::Write as _,
    path::{Path, PathBuf},
    process::Command,
};
use utils::{display_path, type_path};

mod generate;
mod module;
mod utils;

#[derive(Debug, Options)]
struct GeneratorOptions {
    #[options(help = "target directory", default = "src/runtimes/bevy/ext")]
    target: PathBuf,
}

fn generate_modules(type_registry: &TypeRegistryInternal) -> Vec<Module> {
    let mut modules = HashMap::<String, Module>::default();

    for registration in type_registry.iter() {
        let path = type_path(registration.type_name());
        let path = display_path(&path);

        let structure = modules
            .entry(path)
            .or_insert_with_key(|p| Module::new(p.clone()));

        generate_type(type_registry, structure, registration);
    }

    let modules = modules
        .into_values()
        .filter(|m| !m.is_empty())
        .collect::<Vec<Module>>();

    let graph = build_dependency_graph(&modules);
    let order = match topological_order(&graph) {
        Ok(modules) => modules,
        Err(_) => panic!("Graph cycles"),
    };

    order
        .iter()
        .map(move |i| modules[*i].clone())
        .collect::<Vec<Module>>()
}

fn generate(opts: &GeneratorOptions, type_registry: &TypeRegistryInternal) -> Result<(), AnyError> {
    let mut tasks = Vec::default();

    let dependencies = generate_modules(type_registry);

    let iter = dependencies.into_iter().enumerate().map(|(i, module)| {
        let mut path = module.path.split('.').collect::<Vec<&str>>();

        match path.len() {
            0 => unreachable!(),
            1 => path.push(path[0].clone()),
            _ => {}
        }

        let file = path.pop().unwrap();
        let path = path.join("/");

        let path = format!("{}/{:02}_{file}.js", path, i);
        (path, module)
    });

    for (path, module) in iter {
        dbg!(&path);

        let mut p = opts.target.join(&path);
        p.set_extension("js");
        let p = Path::new(&p);

        fs::create_dir_all(p.parent().unwrap()).unwrap();
        let mut f = File::create(p)?;

        writeln!(&mut f, r#""use strict";"#).unwrap();
        writeln!(&mut f, r#"((window) => {{"#).unwrap();

        module.write(&mut f);

        writeln!(&mut f, r#"}})(globalThis)"#).unwrap();

        // For good measure, fire off a beautify command
        tasks.push(
            Command::new("npx.cmd")
                .args(["prettier", "--write"])
                .arg(p)
                .spawn()
                .unwrap(),
        );
    }

    for mut task in tasks.drain(..) {
        task.wait().unwrap();
    }

    Ok(())
}

fn main() -> Result<(), AnyError> {
    let opts = GeneratorOptions::parse_args_default_or_exit();

    let mut app = App::new();
    app.add_plugins(DefaultPlugins);

    let world = app.world;
    let type_registry = world
        .get_resource::<AppTypeRegistry>()
        .expect("Type registry not registered by Bevy")
        .read();

    generate(&opts, &type_registry)
}
