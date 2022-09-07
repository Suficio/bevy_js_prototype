use crate as bjs;
use bjs::{include_js_files, Extension};

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_ui",
            "widget/04_button.js",
            "widget/04_image.js",
            "04_focus.js",
            "04_geometry.js",
            "05_ui_node.js",
        ))
        .build()
}
