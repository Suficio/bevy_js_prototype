use crate as bjs;
use dc::anyhow::Error as AnyError;
use dc::{op, OpState};
use deno_core as dc;
use std::{cell::RefCell, rc::Rc};

/// Represents the default `bevy_js` [JsRuntime](bjs::JsRuntime) which provides
/// methods to interact with `Bevy` [Worlds](bevy::prelude::World).
pub struct BevyRuntime;

impl BevyRuntime {
    /// Provides a reference to the builder before it was used to construct
    /// [BevyRuntime]. Useful for extending the runtime to your needs.
    pub fn builder() -> bjs::JsRuntimeBuilder {
        let extension = bjs::Extension::builder()
            .js(bjs::include_js_files!(
                prefix "bevy:core",
                "../../js/03_core.js",
            ))
            .ops(vec![op_register_system::decl(), op_system::decl()])
            .build();

        let mut builder = bjs::JsRuntime::builder();
        builder
            .with_module_loader(Rc::new(dc::FsModuleLoader))
            .with_extension(extension);

        builder
    }
}

impl bjs::IntoRuntime for BevyRuntime {
    fn runtime() -> bjs::JsRuntime {
        Self::builder().build()
    }
}

#[op]
async fn op_register_system(
    state: Rc<RefCell<OpState>>,
    rid: bjs::ResourceId,
) -> Result<bjs::ResourceId, AnyError> {
    bjs::runtimes::unwrap_world(&state, rid).evaluate().await
}

#[op]
async fn op_system(
    state: Rc<RefCell<OpState>>,
    rid: bjs::ResourceId,
) -> Result<bjs::ResourceId, AnyError> {
    Ok(0)
}
