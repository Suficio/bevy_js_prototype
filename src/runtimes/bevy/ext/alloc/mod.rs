use crate as bjs;
use bjs::{include_js_files, Extension};

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/alloc",
            "04_vec.js",
        ))
        .build()
}
