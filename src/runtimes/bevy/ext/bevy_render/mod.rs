use crate as bjs;
use bjs::{include_js_files, Extension};

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_render",
            "camera/04_projection.js",
            "mesh/mesh/04_skinning.js",
            "view/04_visibility.js",
            "04_color.js",
            "04_primitives.js",
            "04_view.js",
            "camera/05_camera.js",
        ))
        .build()
}
