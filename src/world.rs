use crate as bjs;
use bevy::prelude::*;
use bjs::{futures::channel::oneshot, lend::RefLend};
use std::{cell::RefCell, rc::Rc};

/// Shared resource that gets passed to Deno ops
#[derive(Default)]
pub struct WorldResource {
    /// World reference
    world: RefLend<World>,
    /// Pending awaits for next frame
    pending_frame_awaits: RefCell<Vec<oneshot::Sender<()>>>,
}

impl WorldResource {
    pub fn world(&self) -> &RefLend<World> {
        &self.world
    }
}

impl WorldResource {
    pub async fn wait_for_frame(&self) {
        let (sender, receiver) = oneshot::channel();
        self.pending_frame_awaits.borrow_mut().push(sender);
        if receiver.await.is_err() {
            warn!("Evaluation request cancelled by Bevy sender");
        }
    }

    pub fn lend<'a, 'l, F, R>(&'l self, world: &'a mut World, f: F) -> R
    where
        F: FnOnce() -> R + 'l,
    {
        self.world.scope(world, || {
            // Signal to pending next frame awaits
            for sender in self.pending_frame_awaits.borrow_mut().drain(..) {
                if sender.send(()).is_err() {
                    warn!("Could not lend world due to receiver being dropped");
                }
            }

            f()
        })
    }
}

impl bjs::Resource for WorldResource {}

/// Wrap reference counted [WorldResource] to facilitate inter-op between Bevy
/// and Deno
#[derive(Default)]
pub struct WorldResourceExt(Rc<WorldResource>);

impl WorldResourceExt {
    pub fn inner(&self) -> &Rc<WorldResource> {
        &self.0
    }
}
