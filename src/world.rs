use crate::{
    self as bjs,
    anyhow::{anyhow, Error as AnyError},
    futures::channel::oneshot,
};
use std::{borrow::Cow, cell::RefCell};

/// Shared resource that gets passed to Deno ops
#[derive(Default)]
pub struct JsWorld {
    pub pending_registrations: RefCell<Vec<oneshot::Sender<bjs::ResourceId>>>,
}

impl bjs::Resource for JsWorld {
    fn name(&self) -> Cow<str> {
        // Simpler than bevy_js::runtime::JsRuntimeWorld
        "bevy::World".into()
    }
}

impl JsWorld {
    /// [JsWorld::evaluate] returns the resource ID which can be used to query
    /// the [SystemParams](bevy::ecs::system::SystemParam).
    pub async fn evaluate(&self) -> Result<bjs::ResourceId, AnyError> {
        let (sender, receiver) = oneshot::channel();

        self.pending_registrations.borrow_mut().push(sender);

        receiver
            .await
            .or(Err(anyhow!("Evaluation request cancelled by Bevy sender")))
    }
}
