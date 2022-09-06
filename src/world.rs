use crate::{self as bjs, futures::channel::oneshot, lend::RefLend};
use bevy::prelude::*;
use std::{cell::RefCell, rc::Rc};

/// Shared resource that gets passed to Deno ops
#[derive(Default)]
pub struct WorldResource {
    /// World reference
    world: RefLend<World>,
    /// Requests pending for world to be lent
    pending_requests: RefCell<Vec<oneshot::Sender<()>>>,
}

impl WorldResource {
    pub fn try_borrow_world(&self) -> Option<&World> {
        self.world.borrow()
    }

    pub fn try_borrow_world_mut(&self) -> Option<&mut World> {
        self.world.borrow_mut()
    }

    pub fn borrow_world(&self) -> &World {
        self.try_borrow_world()
            .expect("World was not lent to JS runtime")
    }

    pub fn borrow_world_mut(&self) -> &mut World {
        self.try_borrow_world_mut()
            .expect("World was not lent to JS runtime")
    }
}

impl WorldResource {
    pub async fn wait_for_world(&self) {
        let (sender, receiver) = oneshot::channel();

        self.pending_requests.borrow_mut().push(sender);

        if let Err(_) = receiver.await {
            warn!("Evaluation request cancelled by Bevy sender");
        }
    }

    pub fn lend<'a, 'l, F>(&'l self, world: &'a mut World, f: F)
    where
        F: FnOnce() + 'l,
    {
        self.world.scope(world, || {
            // Signal to pending world requests that [World] has been lent
            for sender in self.pending_requests.borrow_mut().drain(..) {
                if let Err(_) = sender.send(()) {
                    warn!("Could not lend world due to receiver being dropped");
                }
            }

            f()
        });
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
