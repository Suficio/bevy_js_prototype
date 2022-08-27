use std::{cell::*, mem};

/// Provides ownership of a reference using dynamically checked rules
pub struct RefLend<T>(RefCell<Option<*mut T>>);

impl<T> Default for RefLend<T> {
    fn default() -> Self {
        Self(RefCell::new(None))
    }
}

impl<T> RefLend<T> {
    /// Lends reference to object for the provided scope
    pub fn scope<'a, 'l, E, F>(&'l self, lend: &'a mut E, f: F)
    where
        F: FnOnce() + 'l,
    {
        self.0.replace(Some(lend as *mut E as *mut T));
        f();
        self.0.replace(None);
    }

    /// Borrows lent reference if one exists
    pub fn borrow(&self) -> Option<&T> {
        unsafe {
            self.0
                .try_borrow()
                .ok()
                .and_then(|r| r.map(|ptr| mem::transmute(&*ptr)))
        }
    }

    /// Mutably borrows reference if one exists
    pub fn borrow_mut(&self) -> Option<&mut T> {
        unsafe {
            self.0
                .try_borrow_mut()
                .ok()
                .and_then(|r| r.map(|ptr| mem::transmute(&mut *ptr)))
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn lend() {
        let lend = RefLend::<String>::default();
        let mut string = "Hello, World!".to_string();

        assert!(lend.borrow().is_none());

        lend.scope(&mut string, || {
            let string = lend.borrow().unwrap();
            assert_eq!(string, "Hello, World!");
        });

        // Out of Lend scope
        assert!(lend.borrow().is_none());
    }
}
