use crate as bjs;
use bjs::include_js_files;

pub fn init() -> bjs::Extension {
    bjs::Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/alloc",
            "04_vec.js",
        ))
        .build()
}
