use crate as bjs;
use bjs::include_js_files;

pub fn init() -> bjs::Extension {
    bjs::Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_ui",
            "05_text.js",
        ))
        .build()
}
