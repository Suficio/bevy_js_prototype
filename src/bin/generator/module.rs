use bevy::ecs::schedule::GraphNode;
use std::{
    borrow::Cow,
    collections::{
        btree_map::{BTreeMap, Entry},
        BTreeSet,
    },
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
    /// Used to expose dependencies to [GraphNode]
    import_files: Vec<String>,
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

    pub fn insert_import(&mut self, path: String, import: String) {
        // Do not import from the same file
        if !self.path.ends_with(&path) {
            match self.imports.entry(path.clone()) {
                Entry::Vacant(v) => {
                    v.insert(BTreeSet::default()).insert(import);
                    // Insert to import_files only once
                    if path != "bevyEcs.reflect" {
                        self.import_files.push(path);
                    }
                }
                Entry::Occupied(mut o) => {
                    o.get_mut().insert(import);
                }
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
            write!(f, "const {{ ").unwrap();
            for import in imports.iter() {
                write!(f, "{import}, ").unwrap();
            }
            writeln!(f, "}} = window.{file};").unwrap();
        }

        for def in self.types.values() {
            writeln!(f, "{def}").unwrap();
        }

        let path = self.path.split(".").collect::<Vec<&str>>();
        let len = path.len() - 1;

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

        // write!(f, "const {} = {{ ", path[len]).unwrap();
        // for def in self.types.keys() {
        //     write!(f, "{def}, ").unwrap();
        // }
        // writeln!(f, "}};").unwrap();

        // if len == 0 {
        //     writeln!(f, "Object.assign(window, {{ {} }});", path[0]).unwrap();
        // } else {
        //     writeln!(
        //         f,
        //         "Object.assign(window.{}, {{ {} }});",
        //         path[..len].join("."),
        //         path[len]
        //     )
        //     .unwrap();
        // }
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
