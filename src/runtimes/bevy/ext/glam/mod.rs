use crate as bjs;
use bjs::{include_js_files, Extension};

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/glam",
            "bool/04_bvec_2.js",
            "bool/04_bvec_3.js",
            "bool/04_bvec_4.js",
            "f_32/sse_2/04_vec_3_a.js",
            "f_32/sse_2/04_vec_4.js",
            "f_32/04_vec_2.js",
            "f_32/04_vec_3.js",
            "f_64/04_dvec_2.js",
            "f_64/04_dvec_3.js",
            "f_64/04_dvec_4.js",
            "i_32/04_ivec_2.js",
            "i_32/04_ivec_3.js",
            "i_32/04_ivec_4.js",
            "u_32/04_uvec_2.js",
            "u_32/04_uvec_3.js",
            "u_32/04_uvec_4.js",
            "f_32/sse_2/05_mat_2.js",
            "f_32/sse_2/05_mat_3_a.js",
            "f_32/05_mat_3.js",
            "f_64/05_dmat_2.js",
            "f_64/05_dmat_3.js",
            "f_64/05_dmat_4.js",
            "f_32/06_affine_2.js",
            "f_32/06_affine_3_a.js",
            "f_64/06_daffine_2.js",
            "f_64/06_daffine_3.js",
        ))
        .build()
}
