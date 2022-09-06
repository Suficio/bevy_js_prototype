//! Generates JavaScript definition files for ECS Entities from Bevy TypeRegistry

use crate::utils::{display_path, normalize_path};
use bevy::{
    prelude::*,
    reflect::{
        serde::TypedReflectSerializer, Array, ReflectRef, TypeInfo, TypeRegistration,
        TypeRegistryInternal, VariantField, VariantInfo, VariantType,
    },
    utils::HashMap,
};
use bevy_js::anyhow::Error as AnyError;
use convert_case::{Case, Casing};
use deno_core::serde::Serialize;
use generate::generate_type;
use pathdiff::diff_paths;
use proc_macro2::Ident;
use std::{
    collections::{BTreeMap, BTreeSet},
    fmt::Write as _,
    fs::{self, File},
    io::Write as _,
    path::{Path, PathBuf},
    process::Command,
};
use syn::{
    punctuated::Punctuated, token::Comma, GenericArgument, PathArguments, PathSegment, TypePath,
    __private::ToTokens,
};

mod generate;
mod utils;

#[derive(Default)]
pub struct Structure {
    /// Type definitions indexed by generics stripped type name
    //
    // Use [BTreeMap] in order to preserve consistent ordering
    pub types: BTreeMap<String, String>,
    /// Imports indexed by file path
    //
    // Use [BTreeMap] in order to preserve consistent ordering
    pub imports: BTreeMap<String, BTreeSet<String>>,
}

/// Holds the properties necessary to generate a file
impl Structure {
    pub fn insert_import(&mut self, path: &str, import: &str) {
        self.imports
            .entry(path.to_string())
            .or_default()
            .insert(import.to_string());
    }

    pub fn insert_type(&mut self, type_name: String, def: String) {
        self.types.insert(type_name, def);
    }
}

fn generate(type_registry: &TypeRegistryInternal) -> Result<(), AnyError> {
    let mut files = HashMap::<String, Structure>::default();

    for registration in type_registry.iter() {
        let path = normalize_path(registration.type_name());
        if let Some(path) = path.to_str() {
            // Filter out primitives and non-bevy types
            if !path.contains("bevy") {
                continue;
            }

            let structure = files
                .entry(path.to_string())
                .or_insert_with(Structure::default);

            generate_type(type_registry, structure, registration);
        }
    }

    let mut tasks = Vec::with_capacity(files.len());

    for (path, structure) in files.into_iter() {
        let p = Path::new(&path);
        fs::create_dir_all(p.parent().unwrap()).unwrap();

        let mut f = File::create(path.clone())?;
        write!(&mut f, r#""use strict";"#).unwrap();
        for (file, imports) in structure.imports.iter() {
            // Need to filter out if attempting to import from the same file
            let mut p = PathBuf::from(p);
            if file == &display_path(&p) {
                continue;
            }

            write!(&mut f, r#"import {{ "#).unwrap();
            for import in imports.iter() {
                write!(&mut f, r#"{}, "#, import).unwrap();
            }

            p.pop();
            let path = diff_paths(&file, p).unwrap();
            write!(&mut f, r#"}} from "./{}";"#, display_path(&path)).unwrap();
        }

        for def in structure.types.values() {
            writeln!(&mut f, r#"{}"#, def).unwrap();
        }

        // For good measure, fire off a beautify command
        tasks.push(
            Command::new("npm.cmd")
                .args(["exec", "--package=js-beautify", "--"])
                .args(["js-beautify", "-rf"])
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
    let mut app = App::new();
    app.add_plugins(DefaultPlugins);

    let world = app.world;
    let type_registry = world
        .get_resource::<AppTypeRegistry>()
        .expect("Type registry not registered by Bevy")
        .read();

    generate(&type_registry)
}
