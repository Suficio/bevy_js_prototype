use std::{cell::*, mem};

pub struct Lend<T>(Cell<Option<*const T>>);

impl<T> Default for Lend<T> {
    fn default() -> Self {
        Self(Cell::new(None))
    }
}

impl<T> Lend<T> {
    pub fn lend<'a, 'l, E, F>(&'l self, lend: &'a mut E, f: F)
    where
        F: FnOnce() -> () + 'l,
    {
        self.0.set(Some(lend as *const E as *const T));
        f();
        self.0.set(None);
    }

    pub fn get(&self) -> Option<&T> {
        unsafe { self.0.get().map(|ptr| mem::transmute(ptr)) }
    }
}

pub struct RefLend<T>(RefCell<Option<*const T>>);

impl<T> Default for RefLend<T> {
    fn default() -> Self {
        Self(RefCell::new(None))
    }
}

impl<T> RefLend<T> {
    pub fn lend<'a, 'l, E, F>(&'l self, lend: &'a mut E, f: F)
    where
        F: FnOnce() -> () + 'l,
    {
        self.0.replace(Some(lend as *const E as *const T));
        f();
        self.0.replace(None);
    }

    pub fn borrow(&self) -> Option<&T> {
        unsafe {
            self.0
                .try_borrow()
                .ok()
                .and_then(|r| r.map(|ptr| mem::transmute(ptr)))
        }
    }

    pub fn borrow_mut(&self) -> Option<&mut T> {
        unsafe {
            self.0
                .try_borrow_mut()
                .ok()
                .and_then(|r| r.map(|ptr| mem::transmute(ptr)))
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn lend() {
        let lend = Lend::<String>::default();
        let mut string = "Hello, World!".to_string();

        assert!(lend.get().is_none());

        lend.lend(&mut string, || {
            let string = lend.get().unwrap();
            assert_eq!(string, "Hello, World!");
        });

        // Out of Lend scope
        assert!(lend.get().is_none());
    }
}
