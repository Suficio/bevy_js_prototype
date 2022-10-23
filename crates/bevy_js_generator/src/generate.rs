//! Generates JavaScript definition files for ECS Entities from Bevy TypeRegistry

use crate::{
    utils::{file_path, strip_generics},
    Module,
};
use bevy::{
    prelude::*,
    reflect::{
        serde::TypedReflectSerializer, Array, ReflectRef, TypeInfo, TypeRegistration,
        TypeRegistryInternal, VariantField, VariantInfo, VariantType,
    },
};
use deno_core::serde::Serialize;
use std::fmt::Write as _;

/// Shorthand to generate type initialization for array types
fn generate_array_type_init<A>(
    o: &mut String,
    type_registry: &TypeRegistryInternal,
    module: &mut Module,
    array: &A,
) where
    A: Array + ?Sized,
{
    write!(o, r#"["#).unwrap();
    for e in array.iter() {
        write!(
            o,
            r#"{},"#,
            generate_type_init(type_registry, module, e, true)
        )
        .unwrap();
    }
    write!(o, r#"]"#).unwrap();
}

/// Generate type initialization for reflected types
fn generate_type_init(
    type_registry: &TypeRegistryInternal,
    module: &mut Module,
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

    // Do not generate imports for reflectable values
    if !matches!(reflect.reflect_ref(), ReflectRef::Value(_)) {
        module.insert_import(&file_path(&type_name), &short_name);
    }

    match reflect.reflect_ref() {
        ReflectRef::Struct(s) => {
            module.insert_import("bevy_ecs", "ReflectableObject");

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
                    generate_type_init(type_registry, module, field, true)
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
                    generate_type_init(type_registry, module, field, true)
                )
                .unwrap();
            }
            write!(&mut o, r#"]"#).unwrap();
        }
        ReflectRef::Tuple(_) => unimplemented!(),
        ReflectRef::List(l) => {
            generate_array_type_init(&mut o, type_registry, module, l);
        }
        ReflectRef::Array(a) => {
            generate_array_type_init(&mut o, type_registry, module, a);
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
                                    generate_type_init(type_registry, module, value, true)
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
                                    generate_type_init(type_registry, module, value, true)
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
    module: &mut Module,
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
                    module,
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

fn generate_type_info(o: &mut String, module: &mut Module) {
    module.insert_import("bevy_ecs", "TypeRegistry");
    module.insert_import("bevy_ecs", "worldResourceId");

    writeln!(
        o,
        r#"static typeId = TypeRegistry.getTypeIdWithName(worldResourceId, this.typeName);"#,
    )
    .unwrap();
    writeln!(
        o,
        r#"static componentId = TypeRegistry.getComponentId(worldResourceId, this.typeId);"#,
    )
    .unwrap();
}

fn generate_array_type(
    o: &mut String,
    type_registry: &TypeRegistryInternal,
    short_name: &str,
    type_name: &str,
    generics: &syn::punctuated::Punctuated<syn::GenericArgument, syn::token::Comma>,
    registration: &TypeRegistration,
    module: &mut Module,
) {
    module.insert_import("bevy_ecs", "ReflectableArray");

    writeln!(o, r#"class {short_name} extends ReflectableArray {{"#,).unwrap();

    writeln!(o, r#"static typeName = "{type_name}""#,).unwrap();
    if generics.is_empty() {
        generate_type_info(o, module);
    }

    write!(o, "\n").unwrap();

    writeln!(
        o,
        r#"constructor(seq) {{ super({}, seq) }}"#,
        generate_default_type_init(type_registry, module, registration, false)
    )
    .unwrap();
    writeln!(o, r#"}}"#,).unwrap();
}

/// Generates a top-level type definition
pub fn generate_type(
    type_registry: &TypeRegistryInternal,
    module: &mut Module,
    registration: &TypeRegistration,
) {
    let mut o = String::new();

    let (short_name, _) = strip_generics(registration.short_name());
    let (type_name, generics) = strip_generics(registration.type_name());

    match registration.type_info() {
        TypeInfo::Struct(_) => {
            module.insert_import("bevy_ecs", "ReflectableObject");

            writeln!(&mut o, r#"class {short_name} extends ReflectableObject {{"#,).unwrap();

            writeln!(o, r#"static typeName = "{type_name}""#,).unwrap();
            if generics.is_empty() {
                generate_type_info(&mut o, module);
            }

            write!(o, "\n").unwrap();

            writeln!(
                &mut o,
                r#"constructor(struct) {{ super({}, struct) }}"#,
                generate_default_type_init(type_registry, module, registration, false)
            )
            .unwrap();
            writeln!(&mut o, r#"}}"#,).unwrap();
        }
        TypeInfo::TupleStruct(_) => generate_array_type(
            &mut o,
            type_registry,
            &short_name,
            &type_name,
            &generics,
            registration,
            module,
        ),
        TypeInfo::Tuple(_) => unimplemented!(),
        TypeInfo::List(_) => generate_array_type(
            &mut o,
            type_registry,
            &short_name,
            &type_name,
            &generics,
            registration,
            module,
        ),
        TypeInfo::Array(_) => unimplemented!(),
        TypeInfo::Map(_) => unimplemented!(),
        TypeInfo::Value(_) => {}
        TypeInfo::Dynamic(_) => unimplemented!(),
        TypeInfo::Enum(e) => {
            for variant in e.iter() {
                let name = variant.name();
                match variant {
                    VariantInfo::Struct(_) => {
                        module.insert_import("bevy_ecs", "ReflectableObject");

                        writeln!(
                            &mut o,
                            r#"class {short_name}{name} extends ReflectableObject {{"#,
                        )
                        .unwrap();

                        writeln!(o, r#"static typeName = "{type_name}""#,).unwrap();
                        if generics.is_empty() {
                            generate_type_info(&mut o, module);
                        }

                        write!(o, "\n").unwrap();

                        writeln!(
                            &mut o,
                            r#"constructor(struct) {{ super({}, struct) }}"#,
                            generate_default_type_init(type_registry, module, registration, false)
                        )
                        .unwrap();
                        writeln!(&mut o, r#"}}"#,).unwrap();
                    }
                    VariantInfo::Tuple(t) => {
                        if t.field_len() > 1 {
                            generate_array_type(
                                &mut o,
                                type_registry,
                                &format!("{short_name}{name}"),
                                &type_name,
                                &generics,
                                registration,
                                module,
                            );
                        }
                    }
                    // Dont create type definitions for unit variants as
                    // these will be referenced by value
                    VariantInfo::Unit(_) => {
                        module.insert_import("bevy_ecs", "ReflectableUnit");

                        writeln!(
                            &mut o,
                            r#"class {short_name}{name} extends ReflectableUnit {{"#,
                        )
                        .unwrap();

                        writeln!(o, r#"static typeName = "{type_name}""#,).unwrap();
                        if generics.is_empty() {
                            generate_type_info(&mut o, module);
                        }

                        write!(o, "\n").unwrap();

                        writeln!(&mut o, r#"constructor() {{ super("{name}") }}"#,).unwrap();
                        writeln!(&mut o, r#"}}"#,).unwrap();
                    }
                }
            }

            module.insert_import("bevy_ecs", "ReflectableEnum");

            writeln!(&mut o, r#"class {short_name} extends ReflectableEnum {{ "#).unwrap();

            for variant in e.iter() {
                let name = variant.name();
                match variant {
                    VariantInfo::Struct(_) => {
                        writeln!(
                            &mut o,
                            r#"static {name} = (struct) => new {short_name}("{name}", new {short_name}{name}(struct));"#,
                        )
                        .unwrap();
                    }
                    VariantInfo::Tuple(t) => {
                        if t.field_len() == 1 {
                            writeln!(
                                &mut o,
                                r#"static {name} = (value) => new {short_name}("{name}", value);"#,
                            )
                            .unwrap();
                        } else {
                            writeln!(
                                &mut o,
                                r#"static {name} = (value) => new {short_name}("{name}", new {short_name}{name}(value));"#,
                            )
                            .unwrap();
                        }
                    }
                    VariantInfo::Unit(_) => {
                        writeln!(&mut o, r#"static {name} = () => new {short_name}{name}();"#,)
                            .unwrap();
                    }
                }
            }

            write!(&mut o, "\n").unwrap();

            writeln!(o, r#"static typeName = "{type_name}""#,).unwrap();
            if generics.is_empty() {
                generate_type_info(&mut o, module);
            }

            write!(o, "\n").unwrap();

            writeln!(
                &mut o,
                r#"constructor(type, value) {{ super(type, value) }}"#,
            )
            .unwrap();
            writeln!(&mut o, r#"}}"#,).unwrap();
        }
    }

    module.insert_type(short_name, o);
}
