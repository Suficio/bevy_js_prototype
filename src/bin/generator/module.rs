use std::collections::{btree_map::BTreeMap, BTreeSet};

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
}

impl Module {
    pub fn new(path: String) -> Self {
        Self {
            path,
            types: BTreeMap::default(),
            imports: BTreeMap::default(),
        }
    }

    pub fn is_empty(&self) -> bool {
        self.types.is_empty()
    }

    pub fn insert_import(&mut self, path: String, import: String) {
        // Do not import from the same file
        if !self.path.ends_with(&path) {
            self.imports.entry(path).or_default().insert(import);
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
            write!(f, "const {{ ").unwrap();
            for import in imports.iter() {
                write!(f, "{import}, ").unwrap();
            }
            writeln!(f, "}} = window.{file};").unwrap();
        }

        write!(f, "\n").unwrap();

        for def in self.types.values() {
            writeln!(f, "{def}\n").unwrap();
        }

        let path = self.path.split('.').collect::<Vec<&str>>();

        writeln!(
            f,
            "if (!window.hasOwnProperty('{p}')) {{ window.{p} = {{}} }}",
            p = path[0]
        )
        .unwrap();

        for i in 1..path.len() {
            let item = path[i];
            let preceeding = path[..i].join(".");
            writeln!(f, "if (!window.{preceeding}.hasOwnProperty('{item}')) {{ window.{preceeding}.{item} = {{}} }}").unwrap();
        }

        write!(f, "Object.assign(window.{}, {{ ", path.join(".")).unwrap();
        for def in self.types.keys() {
            write!(f, "{def}, ").unwrap();
        }
        writeln!(f, "}} )").unwrap();
    }
}
