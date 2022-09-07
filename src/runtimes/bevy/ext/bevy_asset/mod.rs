use crate as bjs;
use bevy::{asset::HandleId, prelude::*};
use bjs::{anyhow::Error as AnyError, include_js_files, op, Extension, OpState};

pub fn init() -> Extension {
    Extension::builder()
        .js(include_js_files!(
            prefix "bevy:ext/bevy_asset",
            "04_handle.js",
            "05_server.js",
        ))
        .ops(vec![op_asset_server_load::decl()])
        .build()
}

#[op]
pub fn op_asset_server_load(
    state: &mut OpState,
    r_world: bjs::ResourceId,
    path: String,
) -> Result<HandleId, AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(state, r_world);

    let world = res.borrow_world_mut();

    let asset_server = world
        .get_resource::<AssetServer>()
        .ok_or_else(|| AnyError::msg("Could not get AssetServer resource from Bevy"))?;

    Ok(asset_server.load_untyped(&path).id)
}
