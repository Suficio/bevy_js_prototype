use crate as bjs;
use bjs::{include_js_files, Extension};

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/core",
            "04_option.js",
        ))
        .build()
}
