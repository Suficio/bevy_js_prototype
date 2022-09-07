use convert_case::{Case, Casing};
use std::path::PathBuf;
use syn::{
    punctuated::Punctuated, token::Comma, GenericArgument, PathArguments, TypePath,
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
pub fn display_path(path: &PathBuf) -> String {
    path.iter()
        .map(|s| s.to_str().unwrap())
        .collect::<Vec<&str>>()
        .join(".")
}
