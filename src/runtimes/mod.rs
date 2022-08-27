use crate as bjs;
use std::{cell::RefCell, rc::Rc};

mod bevy;

pub use self::bevy::BevyRuntime;

/// Obtains shared [WorldResource] reference from [OpState]
pub fn unwrap_world_resource(
    state: &Rc<RefCell<bjs::OpState>>,
    rid: bjs::ResourceId,
) -> Rc<bjs::WorldResource> {
    state
        .borrow()
        .resource_table
        .get::<bjs::WorldResource>(rid)
        .expect(
            "
                Could not find Bevy world resource from provided ID.
                Ensure that you are using the resource ID provided by `Bevy.worldResourceId`
            ",
        )
}
