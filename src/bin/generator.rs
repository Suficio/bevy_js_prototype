//! Generates JavaScript definition files for ECS Entities from Bevy TypeRegistry

use bevy::{
    prelude::*,
    reflect::{TypeInfo, TypeRegistration, TypeRegistry, TypeRegistryInternal},
    utils::{HashMap, HashSet},
};
use bevy_js::anyhow::Error as AnyError;
use convert_case::{Case, Casing};
use proc_macro2::{Ident, Span};
use std::{
    fmt::Write as _,
    fs::{self, File},
    io::Write as _,
    path::{Path, PathBuf},
    process::Command,
};
use syn::{PathSegment, TypePath};
struct Structure {
    pub types: Vec<String>,
    pub imports: HashSet<String>,
}

impl Default for Structure {
    fn default() -> Self {
        let mut imports = HashSet::default();
        imports.insert("bevy".to_string());

        Self {
            types: Default::default(),
            imports,
        }
    }
}

fn generate_type(
    structure: &mut Structure,
    registration: &TypeRegistration,
    type_def: &PathSegment,
) -> Result<String, AnyError> {
    let mut o = String::new();
    println!("{}", registration.type_name());
    match registration.type_info() {
        TypeInfo::Struct(s) => {
            write!(
                &mut o,
                r#"export class {} extends bevy.ReflectableStruct {{ constructor(struct) {{ super("{}", {{"#,
                registration.short_name(),
                registration.type_name(),
            )
            .unwrap();

            for field in s.iter() {
                write!(&mut o, r#""{}": "{}","#, field.name(), field.type_name(),).unwrap();
            }

            write!(&mut o, r#"}}, struct)}}"#).unwrap();

            for field in s.iter() {
                let n = field.name();
                write!(
                    &mut o,
                    r#"get {n}() {{return this.struct.{n};}}set {n}({n}) {{this.struct.{n} = {n}}}"#
                )
                .unwrap();
            }

            write!(&mut o, r#"}}"#).unwrap();
        }
        TypeInfo::TupleStruct(t) => {
            write!(
                &mut o,
                r#"export class {} extends bevy.ReflectableTupleStruct {{ constructor(seq) {{ super("{}", ["#,
                registration.short_name(),
                registration.type_name(),
            )
            .unwrap();

            for field in t.iter() {
                write!(&mut o, r#""{}","#, field.type_name(),).unwrap();
            }

            write!(&mut o, r#"], seq)}}"#).unwrap();
        }
        TypeInfo::Tuple(_) => unimplemented!(),
        TypeInfo::List(_) => unimplemented!(),
        TypeInfo::Array(_) => unimplemented!(),
        TypeInfo::Map(_) => unimplemented!(),
        TypeInfo::Value(_) => {}
        TypeInfo::Dynamic(_) => unimplemented!(),
    }

    Ok(o)
}

fn generate(type_registry: &TypeRegistryInternal) -> Result<(), AnyError> {
    let mut files = HashMap::<String, Structure>::default();

    for registration in type_registry.iter() {
        let t: TypePath = syn::parse_str(registration.type_name())?;
        let mut segments = t.path.segments;

        if !normalize_namespace(segments.first_mut().unwrap()) {
            continue;
        }

        // Generate path to file that will be written to
        let mut path = PathBuf::new();
        path.push("js");
        path.push("generated");
        for segment in segments.iter() {
            let f = format!("{}", segment.ident);
            path.push(f.to_case(Case::Camel));
        }
        path.set_extension("js");

        let path = path.to_str().unwrap().to_string();
        let structure = files.entry(path).or_insert_with(Structure::default);

        let type_def = segments.pop().unwrap().into_value();
        let type_def = generate_type(structure, registration, &type_def)?;
        structure.types.push(type_def);
    }

    for (path, structure) in files.into_iter() {
        let p = Path::new(&path);
        fs::create_dir_all(p.parent().unwrap()).unwrap();

        let mut f = File::create(path.clone())?;
        for imports in structure.imports {
            writeln!(&mut f, r#"import * as {} from "{}""#, imports, p.display()).unwrap();
        }

        for def in structure.types {
            writeln!(&mut f, r#"{}"#, def).unwrap();
        }

        // For good measure, fire off a beautify command
        Command::new("npm.cmd")
            .args(["exec", "--package=js-beautify", "--"])
            .args(["js-beautify", "-rf"])
            .arg(p)
            .spawn()
            .unwrap();
    }

    Ok(())
}

/// Filter out bevy_ namespaced types and remove prefix for further
/// processing
fn normalize_namespace(path_namespace: &mut PathSegment) -> bool {
    let ident = format!("{}", path_namespace.ident);
    match ident.split_once("_") {
        Some((namespace, ident)) => {
            if namespace != "bevy" {
                return false;
            }
            *path_namespace = Ident::new(ident, Span::call_site()).into();
            true
        }
        None => false,
    }
}

fn main() -> Result<(), AnyError> {
    let mut app = App::new();
    app.add_plugins(DefaultPlugins);

    let world = app.world;
    let type_registry = world
        .get_resource::<TypeRegistry>()
        .expect("TypeRegistry not registered by Bevy");
    let type_registry = type_registry.read();

    let _ = fs::remove_dir_all("js/generated");
    fs::create_dir_all("js/generated")?;

    generate(&type_registry)
}
