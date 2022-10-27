mod ptr;
mod vec;

pub use ptr::ComponentPtr;
pub use vec::VecPtr;

#[allow(unreachable_code)]
pub(crate) unsafe fn debug_checked_unreachable() -> ! {
    #[cfg(debug_assertions)]
    unreachable!();
    std::hint::unreachable_unchecked();
}

#[cfg(test)]
mod tests {
    use super::*;
    use bevy::{
        prelude::*,
        reflect::{ReflectFromPtr, TypeRegistry},
    };

    #[derive(Component)]
    struct A;

    #[derive(Component)]
    #[component(storage = "SparseSet")]
    struct B;

    #[derive(Component, Reflect, PartialEq, Debug)]
    struct Data(String);

    #[test]
    fn query_empty() {
        let mut world = World::new();
        let component_id = world.init_component::<A>();

        let mut query = unsafe {
            QueryState::<&ComponentPtr, ()>::new_with_state(&mut world, component_id, ())
        };
        let count = query.iter(&mut world).count();
        assert_eq!(count, 0);

        // Check dynamic VecPtr variations

        let mut query = unsafe {
            QueryState::<VecPtr<&ComponentPtr>, ()>::new_with_state(
                &mut world,
                vec![component_id],
                (),
            )
        };
        let count = query.iter(&mut world).count();
        assert_eq!(count, 0);
    }

    #[test]
    fn query() {
        let mut world = World::new();

        let a = world.init_component::<A>();
        let b = world.init_component::<B>();

        world.spawn((A, B));
        world.spawn(A);

        let mut query =
            unsafe { QueryState::<&ComponentPtr, ()>::new_with_state(&mut world, a, ()) };
        let count = query.iter(&mut world).count();
        assert_eq!(count, 2);

        let mut query =
            unsafe { QueryState::<&ComponentPtr, ()>::new_with_state(&mut world, b, ()) };
        let count = query.iter(&mut world).count();
        assert_eq!(count, 1);

        let mut query = unsafe {
            QueryState::<(&ComponentPtr, &ComponentPtr), ()>::new_with_state(&mut world, (a, b), ())
        };
        let count = query.iter(&mut world).count();
        assert_eq!(count, 1);

        // Check dynamic VecPtr variations

        let mut query = unsafe {
            QueryState::<VecPtr<&ComponentPtr>, ()>::new_with_state(&mut world, vec![a], ())
        };
        let count = query.iter(&mut world).count();
        assert_eq!(count, 2);

        let mut query = unsafe {
            QueryState::<VecPtr<&ComponentPtr>, ()>::new_with_state(&mut world, vec![b], ())
        };
        let count = query.iter(&mut world).count();
        assert_eq!(count, 1);

        let mut query = unsafe {
            QueryState::<VecPtr<&ComponentPtr>, ()>::new_with_state(&mut world, vec![a, b], ())
        };
        let count = query.iter(&mut world).count();
        assert_eq!(count, 1);
    }

    #[test]
    fn query_data() {
        let mut world = World::new();
        let type_registry = TypeRegistry::default();
        let mut type_registry = type_registry.write();

        type_registry.register::<Data>();
        let component_id = world.init_component::<Data>();

        world.spawn(Data("Hello, World!".to_string()));

        let mut query = unsafe {
            QueryState::<&ComponentPtr, ()>::new_with_state(&mut world, component_id, ())
        };

        for data in query.iter(&mut world) {
            let reflect_data = type_registry.get(std::any::TypeId::of::<Data>()).unwrap();
            let reflect_from_ptr = reflect_data.data::<ReflectFromPtr>().unwrap();

            let data = unsafe { reflect_from_ptr.as_reflect_ptr(data) };
            let data = data.as_any().downcast_ref::<Data>().unwrap();

            assert_eq!(data, &Data("Hello, World!".to_string()))
        }
    }

    #[test]
    fn query_data_multiple() {
        let mut world = World::new();
        let type_registry = TypeRegistry::default();
        let mut type_registry = type_registry.write();

        type_registry.register::<Data>();
        let component_id = world.init_component::<Data>();

        world.spawn(Data("Hello, World!".to_string()));
        world.spawn(Data("Hello, World!".to_string()));
        world.spawn(Data("Hello, World!".to_string()));

        let mut query = unsafe {
            QueryState::<&ComponentPtr, ()>::new_with_state(&mut world, component_id, ())
        };

        let res = query.iter_mut(&mut world).collect::<Vec<_>>();
        assert_eq!(res.len(), 3);

        for data in res.into_iter() {
            let reflect_data = type_registry.get(std::any::TypeId::of::<Data>()).unwrap();
            let reflect_from_ptr = reflect_data.data::<ReflectFromPtr>().unwrap();

            let data = unsafe { reflect_from_ptr.as_reflect_ptr(data) };
            let data = data.as_any().downcast_ref::<Data>().unwrap();

            assert_eq!(data.0, "Hello, World!".to_string());
        }
    }
}
