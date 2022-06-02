use crate as bjs;
use std::{cell::RefCell, rc::Rc};

mod bevy;

pub use self::bevy::BevyRuntime;

/// Obtains shared Bevy world reference from [OpState]
pub fn unwrap_world(state: &Rc<RefCell<bjs::OpState>>, rid: bjs::ResourceId) -> Rc<bjs::JsWorld> {
    state
        .borrow()
        .resource_table
        .get::<bjs::JsWorld>(rid)
        .expect(
            "
                Could not find Bevy world resource from provided ID.
                Ensure that you are using the resource ID provided by `Bevy.worldResourceId`
            ",
        )
}
