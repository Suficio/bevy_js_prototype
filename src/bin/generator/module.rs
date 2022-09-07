use bevy::ecs::schedule::GraphNode;
use std::{
    borrow::Cow,
    collections::{BTreeMap, BTreeSet},
};

/// Holds the properties necessary to generate a file
#[derive(Clone, Debug)]
pub struct Module {
    /// Path to module
    pub path: String,
    /// Type definitions indexed by generics stripped type name
    //
    // Use [BTreeMap] in order to preserve consistent ordering
    pub types: BTreeMap<String, String>,
    /// Imports indexed by file path
    //
    // Use [BTreeMap] in order to preserve consistent ordering
    pub imports: BTreeMap<String, BTreeSet<String>>,
    pub import_files: Vec<String>,
}

impl Module {
    pub fn new(path: String) -> Self {
        Self {
            path,
            types: BTreeMap::default(),
            imports: BTreeMap::default(),
            import_files: Vec::default(),
        }
    }

    pub fn is_empty(&self) -> bool {
        self.types.is_empty()
    }

    pub fn insert_import(&mut self, path: &str, import: &str) {
        // Do not import from the same file
        if !self.path.ends_with(path) {
            self.imports
                .entry(path.to_string())
                .or_default()
                .insert(import.to_string());

            if path != "bevyEcs.reflect" {
                self.import_files.push(path.to_string());
            }
        }
    }

    pub fn insert_type(&mut self, type_name: String, def: String) {
        // Primitives will be empty
        if !def.is_empty() {
            self.types.insert(type_name, def);
        }
    }
}

impl Module {
    pub fn write<W>(&self, f: &mut W)
    where
        W: std::io::Write,
    {
        for (file, imports) in self.imports.iter() {
            write!(f, r#"const {{ "#).unwrap();
            for import in imports.iter() {
                write!(f, r#"{import}, "#).unwrap();
            }
            writeln!(f, r#"}} = window.{file};"#).unwrap();
        }

        for def in self.types.values() {
            writeln!(f, "{def}").unwrap();
        }

        let path = &self.path;
        write!(f, r#"window.{path} = Object.assign(window.{path}, {{ "#).unwrap();
        for def in self.types.keys() {
            write!(f, "{def}, ").unwrap();
        }
        writeln!(f, r#"}} );"#).unwrap();
    }
}

impl GraphNode for Module {
    type Label = String;

    fn name(&self) -> std::borrow::Cow<'static, str> {
        Cow::Owned(self.path.clone())
    }

    fn labels(&self) -> &[Self::Label] {
        std::slice::from_ref(&self.path)
    }

    fn before(&self) -> &[Self::Label] {
        &[]
    }

    fn after(&self) -> &[Self::Label] {
        &self.import_files
    }
}