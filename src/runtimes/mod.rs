use crate as bjs;
use std::{cell::RefCell, rc::Rc};

mod bevy;

pub use self::bevy::BevyRuntime;

/// Obtains shared [BevyResource] reference from [OpState]
pub fn unwrap_bevy_resource(
    state: &Rc<RefCell<bjs::OpState>>,
    rid: bjs::ResourceId,
) -> Rc<bjs::BevyResource> {
    state
        .borrow()
        .resource_table
        .get::<bjs::BevyResource>(rid)
        .expect(
            "
                Could not find Bevy world resource from provided ID.
                Ensure that you are using the resource ID provided by `Bevy.worldResourceId`
            ",
        )
}
