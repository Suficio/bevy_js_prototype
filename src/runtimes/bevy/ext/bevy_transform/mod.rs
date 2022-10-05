use crate as bjs;
use bjs::include_js_files;

pub fn init() -> bjs::Extension {
    bjs::Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_transform",
            "components/04_global_transform.js",
            "components/05_transform.js",
        ))
        .build()
}
