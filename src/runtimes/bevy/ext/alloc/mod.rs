use crate as bjs;
use bjs::{include_js_files, Extension};

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_ui",
            "04_vec.js",
        ))
        .build()
}
