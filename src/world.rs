use crate::{self as bjs, anyhow::Error as AnyError, futures::channel::oneshot, lend::RefLend};
use bevy::prelude::*;
use std::{borrow::Cow, cell::RefCell};

/// Shared resource that gets passed to Deno ops
#[derive(Default)]
pub struct WorldResource {
    /// World reference
    world: RefLend<World>,
    /// Requests pending for world to be lent
    pending_requests: RefCell<Vec<oneshot::Sender<()>>>,
}

impl bjs::Resource for WorldResource {
    fn name(&self) -> Cow<str> {
        // Simpler than bevy_js::world::WorldResource
        "bevy_js::Resource".into()
    }
}

impl WorldResource {
    pub fn world(&self) -> &World {
        self.world
            .borrow()
            .expect("World was not lent to JS runtime")
    }

    pub fn world_mut(&self) -> &mut World {
        self.world
            .borrow_mut()
            .expect("World was not lent to JS runtime")
    }
}

impl WorldResource {
    pub async fn wait_for_world(&self) -> Result<(), AnyError> {
        let (sender, receiver) = oneshot::channel();

        self.pending_requests.borrow_mut().push(sender);

        receiver
            .await
            .map_err(|_| AnyError::msg("Evaluation request cancelled by Bevy sender"))
    }

    pub(crate) fn lend<'a, 'l, F>(&'l self, world: &'a mut World, f: F)
    where
        F: FnOnce() + 'l,
    {
        self.world.scope(world, || {
            // Signal to pending world requests that [World] has been lent
            for sender in self.pending_requests.borrow_mut().drain(..) {
                sender
                    .send(())
                    .expect("Could not lend world due to receiver being dropped");
            }

            f()
        });
    }
}
