use std::collections::HashMap;
use convert_case::{Case, Casing};
use syn::{
    punctuated::Punctuated, token::Comma, GenericArgument, PathArguments, TypePath,
    __private::ToTokens,
};

use crate::module::Module;

/// Strip generic parameters from names
pub fn strip_generics(name: &str) -> (String, Punctuated<GenericArgument, Comma>) {
    let mut t: TypePath = syn::parse_str(name).unwrap();

    let last = t.path.segments.last_mut().unwrap();
    let arguments = match &last.arguments {
        PathArguments::AngleBracketed(a) => a.args.clone(),
        _ => Punctuated::new(),
    };
    last.arguments = PathArguments::None;

    let mut stripped = format!("{}", t.into_token_stream());
    stripped.retain(|c| !c.is_whitespace());

    (stripped, arguments)
}

/// Generate file path to module
pub fn file_path(type_name: &str) -> String {
    let t: TypePath = syn::parse_str(type_name).unwrap();
    let segments = t.path.segments;

    let mut iter = segments.iter().map(|s| format!("{}", s.ident));
    let _ = iter.next_back(); // Skip actual type

    Vec::from_iter(iter).join("/")
}

/// Generate JavaScript module path from file path
pub fn module_path(file_path: &str) -> String {
    let mut iter = file_path.split('/');

    let namespace = match iter.next() {
        Some(namespace) => namespace,
        None => return String::new(),
    };

    let mut path = vec![];

    // Convert crate scope to module scope (e.g. "bevy_text" to "Bevy.text")
    if namespace.starts_with("bevy_") {
        let module = namespace.split('_').last().unwrap();
        path.push(format!("Bevy.{module}"));
    } else {
        path.push(format!("{namespace}"));
    }

    path.extend(iter.map(|p| p.to_case(Case::Camel)));
    path.join(".")
}

fn ordered_module_path(module: &Module, level: usize) -> String {
    let mut path = module.path.split('/').collect::<Vec<_>>();
    match path.len() {
        0 => unreachable!(),
        // Ensure that a separate folder can be created to establish a crate
        1 => path.push(path[0].clone()),
        _ => {}
    }

    let file = path.pop().unwrap();
    let path = path.join("/");

    format!("{}/{:02}_{file}.js", path, level)
}

pub fn evaluate_dependency_order(modules: Vec<Module>, base_level: usize) -> Vec<(String, Module)> {
    let mut levels = HashMap::<String, usize>::new();

    let mut remaining_modules = modules.clone();
    while !remaining_modules.is_empty() {
        remaining_modules.retain(|module| {
            // Check if all dependencies have been assigned a level
            let mut max_level = 0;
            for dep in module.imports.keys() {
                match levels.get(dep) {
                    Some(level) => max_level = max_level.max(*level),
                    None => return true,
                }
            }

            // All dependencies have been assigned a level
            levels.insert(module.path.clone(), max_level + 1);
            false
        })
    }

    modules
        .into_iter()
        .map(|m| {
            let level = levels.get(&m.path).unwrap() + base_level;
            let path = ordered_module_path(&m, level);
            (path, m)
        })
        .collect()
}
