use crate as bjs;
use bjs::include_js_files;

pub fn init() -> bjs::Extension {
    bjs::Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/glam",
            "bool/04_bvec2.js",
            "bool/04_bvec3.js",
            "bool/04_bvec4.js",
            "f32/sse2/04_vec3a.js",
            "f32/sse2/04_vec4.js",
            "f32/04_vec2.js",
            "f32/04_vec3.js",
            "f64/04_dvec2.js",
            "f64/04_dvec3.js",
            "f64/04_dvec4.js",
            "i32/04_ivec2.js",
            "i32/04_ivec3.js",
            "i32/04_ivec4.js",
            "u32/04_uvec2.js",
            "u32/04_uvec3.js",
            "u32/04_uvec4.js",
            "f32/sse2/05_mat2.js",
            "f32/sse2/05_mat3a.js",
            "f32/05_mat3.js",
            "f64/05_dmat2.js",
            "f64/05_dmat3.js",
            "f64/05_dmat4.js",
            "f32/06_affine2.js",
            "f32/06_affine3a.js",
            "f64/06_daffine2.js",
            "f64/06_daffine3.js",
        ))
        .build()
}
