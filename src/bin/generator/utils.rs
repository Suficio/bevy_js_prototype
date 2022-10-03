use bevy::utils::hashbrown::HashMap;
use convert_case::{Case, Casing};
use std::path::{Path, PathBuf};
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

/// Generate file path to module of a type
pub fn type_path(type_name: &str) -> PathBuf {
    let t: TypePath = syn::parse_str(type_name).unwrap();
    let segments = t.path.segments;

    let mut path = PathBuf::default();
    let iter = segments
        .iter()
        .map(|s| format!("{}", s.ident).to_case(Case::Camel));

    for segment in iter {
        path.push(segment);
    }
    path.pop();

    path
}

/// Force path to display with forward slash
pub fn display_path(path: &Path) -> String {
    path.iter()
        .map(|s| s.to_str().unwrap())
        .collect::<Vec<&str>>()
        .join(".")
}

fn ordered_module_path(module: &Module, level: usize) -> String {
    let mut path = module
        .path
        .split('.')
        .map(|s| s.to_case(Case::Snake))
        .collect::<Vec<String>>();

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
