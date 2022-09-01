//! Generates JavaScript definition files for ECS Entities from Bevy TypeRegistry

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

#[derive(Default)]
struct Structure {
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

/// Shorthand to generate type initialization for array types
fn generate_array_type_init<A>(
    o: &mut String,
    type_registry: &TypeRegistryInternal,
    structure: &mut Structure,
    array: &A,
) where
    A: Array + ?Sized,
{
    write!(o, r#"["#).unwrap();
    for e in array.iter() {
        write!(
            o,
            r#"{},"#,
            generate_type_init(type_registry, structure, e, true)
        )
        .unwrap();
    }
    write!(o, r#"]"#).unwrap();
}

/// Generate type initialization for reflected types
fn generate_type_init(
    type_registry: &TypeRegistryInternal,
    structure: &mut Structure,
    reflect: &dyn Reflect,
    use_constructor: bool,
) -> String {
    let mut o = String::new();

    let registration = match type_registry.get(reflect.get_type_info().type_id()) {
        Some(r) => r,
        None => return "null".to_string(),
    };

    let (short_name, _) = strip_generics(registration.short_name());
    let (type_name, _generics) = strip_generics(registration.type_name());

    let path = normalize_path(&type_name);
    // Check if path isn't a primitive
    if !path.to_string_lossy().is_empty() {
        // Do not generate imports for reflectable values
        if !matches!(reflect.reflect_ref(), ReflectRef::Value(_)) {
            structure.insert_import(&display_path(&path), &short_name);
        }
    }

    match reflect.reflect_ref() {
        ReflectRef::Struct(s) => {
            structure.insert_import("js/bevy.js", "ReflectableObject");

            if use_constructor {
                write!(&mut o, r#"new {short_name}("#).unwrap();
            }
            write!(&mut o, r#"{{"#).unwrap();

            for i in 0..s.field_len() {
                let name = s.name_at(i).unwrap();
                let field = s.field_at(i).unwrap();
                write!(
                    &mut o,
                    r#"{}: {},"#,
                    name,
                    generate_type_init(type_registry, structure, field, true)
                )
                .unwrap();
            }

            write!(&mut o, r#"}}"#).unwrap();
            if use_constructor {
                write!(&mut o, r#")"#).unwrap();
            }
        }
        ReflectRef::TupleStruct(t) => {
            write!(&mut o, r#"["#).unwrap();
            for field in t.iter_fields() {
                write!(
                    &mut o,
                    r#"{},"#,
                    generate_type_init(type_registry, structure, field, true)
                )
                .unwrap();
            }
            write!(&mut o, r#"]"#).unwrap();
        }
        ReflectRef::Tuple(_) => unimplemented!(),
        ReflectRef::List(l) => {
            generate_array_type_init(&mut o, type_registry, structure, &*l);
        }
        ReflectRef::Array(a) => {
            generate_array_type_init(&mut o, type_registry, structure, a);
        }
        ReflectRef::Map(_) => unimplemented!(),
        ReflectRef::Value(v) => {
            let mut json_ser = serde_json::Serializer::new(unsafe { o.as_mut_vec() });
            if TypedReflectSerializer::new(v, type_registry)
                .serialize(&mut json_ser)
                .is_err()
            {
                return "null".to_string();
            };
        }
        ReflectRef::Enum(e) => {
            write!(&mut o, r#"{short_name}.{}("#, e.variant_name()).unwrap();

            match e.variant_type() {
                VariantType::Struct => {
                    write!(&mut o, r#"{{"#).unwrap();

                    for field in e.iter_fields() {
                        match field {
                            VariantField::Struct(name, value) => {
                                write!(
                                    &mut o,
                                    r#"{}: {},"#,
                                    name,
                                    generate_type_init(type_registry, structure, value, true)
                                )
                                .unwrap();
                            }
                            VariantField::Tuple(_) => unreachable!(),
                        }
                    }

                    write!(&mut o, r#"}}"#).unwrap();
                }
                VariantType::Tuple => {
                    write!(&mut o, r#"["#).unwrap();

                    for field in e.iter_fields() {
                        match field {
                            VariantField::Tuple(value) => {
                                write!(
                                    &mut o,
                                    r#"{},"#,
                                    generate_type_init(type_registry, structure, value, true)
                                )
                                .unwrap();
                            }
                            VariantField::Struct(_, _) => unreachable!(),
                        }
                    }

                    write!(&mut o, r#"]"#).unwrap();
                }
                VariantType::Unit => {}
            }

            write!(&mut o, r#")"#).unwrap();
        }
    }
    o
}

/// Generates type initialization for types with a default implementation
fn generate_default_type_init(
    type_registry: &TypeRegistryInternal,
    structure: &mut Structure,
    registration: &TypeRegistration,
    use_constructor: bool,
) -> String {
    let mut o = String::new();

    // First check if root registration has ReflectDefault implementation, if
    // not, iterate into the fields and apply their ReflectDefault and null
    // otherwise.
    match registration.data::<ReflectDefault>() {
        Some(default) => {
            write!(
                &mut o,
                r#"{}"#,
                generate_type_init(
                    type_registry,
                    structure,
                    default.default().as_ref(),
                    use_constructor,
                )
            )
            .unwrap();
        }
        // Since there is no ReflectDefault we can generate from TypeInfo
        None => match registration.type_info() {
            TypeInfo::Value(v) => {
                // A bunch of primitives dont have implemented ReflectDefault
                match v.type_name() {
                    "bool" => write!(&mut o, r#"false"#).unwrap(),
                    "char" => write!(&mut o, r#"0"#).unwrap(),
                    "u8" | "u16" | "u32" | "u64" | "u128" | "usize" => {
                        write!(&mut o, r#"0"#).unwrap()
                    }
                    "i8" | "i16" | "i32" | "i64" | "i128" | "isize" => {
                        write!(&mut o, r#"0"#).unwrap()
                    }
                    "f32" | "f64" => write!(&mut o, r#"0.0"#).unwrap(),
                    "String" => write!(&mut o, r#""""#).unwrap(),
                    _ => write!(&mut o, r#"null"#).unwrap(),
                };
            }
            _ => write!(&mut o, r#"null"#).unwrap(),
        },
    };

    o
}

/// Generates a top-level type definition
fn generate_type(
    type_registry: &TypeRegistryInternal,
    structure: &mut Structure,
    registration: &TypeRegistration,
) {
    let mut o = String::new();

    let (short_name, _) = strip_generics(registration.short_name());
    let (type_name, _generics) = strip_generics(registration.type_name());

    match registration.type_info() {
        TypeInfo::Struct(_) => {
            structure.insert_import("js/bevy.js", "ReflectableObject");

            write!(
                &mut o,
                r#"export class {short_name} extends ReflectableObject {{"#,
            )
            .unwrap();
            write!(
                &mut o,
                r#"constructor(struct) {{ super({}, struct) }}"#,
                generate_default_type_init(type_registry, structure, registration, false)
            )
            .unwrap();
            write!(&mut o, r#"typeName() {{ return "{type_name}" }}}}"#,).unwrap();
        }
        TypeInfo::TupleStruct(_) => {
            structure.insert_import("js/bevy.js", "ReflectableArray");

            write!(
                &mut o,
                r#"export class {short_name} extends ReflectableArray {{"#,
            )
            .unwrap();
            write!(
                &mut o,
                r#"constructor(seq) {{ super({}, seq) }}"#,
                generate_default_type_init(type_registry, structure, registration, false)
            )
            .unwrap();
            write!(&mut o, r#"typeName() {{ return "{type_name}" }}}}"#,).unwrap();
        }
        TypeInfo::Tuple(_) => unimplemented!(),
        TypeInfo::List(_) => unimplemented!(),
        TypeInfo::Array(_) => unimplemented!(),
        TypeInfo::Map(_) => unimplemented!(),
        TypeInfo::Value(_) => {}
        TypeInfo::Dynamic(_) => unimplemented!(),
        TypeInfo::Enum(e) => {
            for variant in e.iter() {
                let name = variant.name();
                match variant {
                    VariantInfo::Struct(_) => {
                        structure.insert_import("js/bevy.js", "ReflectableObject");

                        write!(
                            &mut o,
                            r#"export class {short_name}{name} extends ReflectableObject {{"#,
                        )
                        .unwrap();
                        write!(
                            &mut o,
                            r#"constructor(struct) {{ super({}, struct) }}"#,
                            generate_default_type_init(
                                type_registry,
                                structure,
                                registration,
                                false
                            )
                        )
                        .unwrap();
                        write!(&mut o, r#"typeName() {{ return "{type_name}" }} }}"#,).unwrap();
                    }
                    VariantInfo::Tuple(t) => {
                        if t.field_len() > 1 {
                            structure.insert_import("js/bevy.js", "ReflectableArray");

                            write!(
                                &mut o,
                                r#"export class {short_name}{name} extends ReflectableArray {{"#,
                            )
                            .unwrap();
                            write!(
                                &mut o,
                                r#"constructor(seq) {{ super(null, {}, seq) }}"#,
                                generate_default_type_init(
                                    type_registry,
                                    structure,
                                    registration,
                                    false
                                )
                            )
                            .unwrap();
                            write!(&mut o, r#"typeName() {{ return "{type_name}" }} }}"#,).unwrap();
                        }
                    }
                    // Dont create type definitions for unit variants as
                    // these will be referenced by value
                    VariantInfo::Unit(_) => {
                        structure.insert_import("js/bevy.js", "ReflectableUnit");

                        write!(
                            &mut o,
                            r#"export class {short_name}{name} extends ReflectableUnit {{"#,
                        )
                        .unwrap();
                        write!(&mut o, r#"constructor() {{ super("{name}") }}"#,).unwrap();
                        write!(&mut o, r#"typeName() {{ return "{type_name}" }} }};"#,).unwrap();
                    }
                }
            }

            structure.insert_import("js/bevy.js", "ReflectableEnum");

            write!(
                &mut o,
                r#"export class {short_name} extends ReflectableEnum {{ "#
            )
            .unwrap();

            for variant in e.iter() {
                let name = variant.name();
                match variant {
                    VariantInfo::Struct(_) => {
                        write!(
                            &mut o,
                            r#"static {name} = (defaults, struct) => new {short_name}("{name}", new {short_name}{name}(defaults, struct));"#,
                        )
                        .unwrap();
                    }
                    VariantInfo::Tuple(t) => {
                        if t.field_len() == 1 {
                            write!(
                                &mut o,
                                r#"static {name} = (value) => new {short_name}("{name}", value);"#,
                            )
                            .unwrap();
                        } else {
                            write!(
                                &mut o,
                                r#"static {name} = (value) => new {short_name}("{name}", new {short_name}{name}(value));"#,
                            )
                            .unwrap();
                        }
                    }
                    VariantInfo::Unit(_) => {
                        write!(&mut o, r#"static {name} = () => new {short_name}{name}();"#,)
                            .unwrap();
                    }
                }
            }

            write!(
                &mut o,
                r#"constructor(type, value) {{ super(type, value) }}"#,
            )
            .unwrap();

            write!(&mut o, r#"typeName() {{ return "{type_name}" }} }}"#,).unwrap();
        }
    }

    structure.insert_type(short_name, o);
}

/// Strip generic parameters from names
fn strip_generics(name: &str) -> (String, Punctuated<GenericArgument, Comma>) {
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

/// Convert `bevy_C::` crate types into `bevy/C/` paths
fn normalize_path(type_name: &str) -> PathBuf {
    let t: TypePath = syn::parse_str(type_name).unwrap();
    let mut segments = t.path.segments;

    // Extract type
    let _type_def = segments.pop().unwrap().into_value();

    // Normalize root segment
    match segments.first_mut() {
        Some(root_segment) => {
            let span = root_segment.ident.span();
            let ident = format!("{}", root_segment.ident);
            match ident.split_once("_") {
                Some((namespace, ident)) => {
                    if namespace == "bevy" {
                        *root_segment = Ident::new(ident, span).into();
                        drop(root_segment);

                        segments.insert(
                            0,
                            PathSegment {
                                ident: Ident::new("bevy", span),
                                arguments: syn::PathArguments::None,
                            },
                        );
                    }
                }
                None => {}
            };
        }
        // Exit early on primitives
        None => return PathBuf::new(),
    };

    // Generate path
    let mut path = PathBuf::from("js");
    let iter = segments
        .iter()
        .map(|s| format!("{}", s.ident).to_case(Case::Camel));

    for segment in iter {
        path.push(segment);
    }

    path.set_extension("js");

    path
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

/// Force path to display with forward slash
fn display_path(path: &PathBuf) -> String {
    path.iter()
        .map(|s| s.to_str().unwrap())
        .collect::<Vec<&str>>()
        .join("/")
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
