use convert_case::{Case, Casing};
use proc_macro2::Ident;
use std::path::PathBuf;
use syn::{
    punctuated::Punctuated, token::Comma, GenericArgument, PathArguments, PathSegment, TypePath,
    __private::ToTokens,
};

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

/// Convert `bevy_C::` crate types into `bevy/C/` paths
pub fn normalize_path(type_name: &str) -> PathBuf {
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

/// Force path to display with forward slash
pub fn display_path(path: &PathBuf) -> String {
    path.iter()
        .map(|s| s.to_str().unwrap())
        .collect::<Vec<&str>>()
        .join("/")
}
