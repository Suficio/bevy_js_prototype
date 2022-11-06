use crate as bjs;
use bevy::{asset::HandleId, prelude::*};
use bjs::{include_js_files, op, OpState};
use std::{cell::RefCell, rc::Rc};

pub fn init() -> bjs::Extension {
    bjs::Extension::builder()
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
    state: Rc<RefCell<OpState>>,
    r_world: bjs::ResourceId,
    path: String,
) -> Result<HandleId, bjs::AnyError> {
    let res = bjs::runtimes::unwrap_world_resource(&state.borrow(), r_world);

    let world = res.borrow_world();

    let asset_server = world
        .get_resource::<AssetServer>()
        .ok_or_else(|| bjs::AnyError::msg("Could not get AssetServer resource from Bevy"))?;

    Ok(asset_server.load_untyped(&path).id)
}
