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
    pub fn scope<'a, 'l, E, F, R>(&'l self, lend: &'a mut E, f: F) -> R
    where
        F: FnOnce() -> R + 'l,
    {
        self.0.replace(Some(lend as *mut E as *mut T));
        let r = f();
        self.0.replace(None);
        r
    }

    /// Borrows lent reference if one exists or can be borrowed
    pub fn borrow(&self) -> Option<Ref<&T>> {
        unsafe {
            match self.0.try_borrow() {
                Ok(r) => match Ref::filter_map(r, Option::as_ref) {
                    Ok(r) => Some(Ref::map(r, |ptr| mem::transmute(ptr))),
                    Err(_) => None,
                },
                Err(_) => None,
            }
        }
    }

    /// Mutably borrows reference if one exists or can be borrowed
    pub fn borrow_mut(&self) -> Option<RefMut<&mut T>> {
        unsafe {
            match self.0.try_borrow_mut() {
                Ok(r) => match RefMut::filter_map(r, Option::as_mut) {
                    Ok(r) => Some(RefMut::map(r, |ptr| mem::transmute(ptr))),
                    Err(_) => None,
                },
                Err(_) => {
                    println!("Borrow exists");
                    None
                }
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn lend_already_borrowed() {
        let lend = RefLend::<String>::default();
        let mut string = "Hello, World!".to_string();

        assert!(lend.borrow().is_none());

        lend.scope(&mut string, || {
            let string = lend.borrow().unwrap();
            assert_eq!(*string, "Hello, World!");

            assert!(lend.borrow().is_some());
            assert!(lend.borrow_mut().is_none());
        });

        // Out of Lend scope
        assert!(lend.borrow().is_none());
    }

    #[test]
    fn lend_already_borrowed_mut() {
        let lend = RefLend::<String>::default();
        let mut string = "Hello, World!".to_string();

        lend.scope(&mut string, || {
            let string = lend.borrow_mut().unwrap();
            assert_eq!(*string, "Hello, World!");

            assert!(lend.borrow().is_none());
            assert!(lend.borrow_mut().is_none());
        });
    }
}
