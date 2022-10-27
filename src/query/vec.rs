use bevy::{
    ecs::{
        archetype::{Archetype, ArchetypeComponentId},
        component::ComponentId,
        query::{
            Access, FilteredAccess, QueryItem, ReadOnlyWorldQuery, WorldQuery, WorldQueryGats,
        },
        storage::{Table, Tables},
    },
    prelude::*,
};

use std::marker::PhantomData;

/// Type used to query dense components
pub struct VecPtr<T> {
    _phantom: PhantomData<T>,
}

impl<'w, T> WorldQueryGats<'w> for VecPtr<T>
where
    T: WorldQueryGats<'w>,
{
    type Item = Vec<T::Item>;
    type Fetch = Vec<T::Fetch>;
}

/// SAFETY: each item in the vec is read only
unsafe impl<T> ReadOnlyWorldQuery for VecPtr<T> where T: ReadOnlyWorldQuery {}

unsafe impl<T> WorldQuery for VecPtr<T>
where
    T: WorldQuery,
{
    type ReadOnly = VecPtr<T::ReadOnly>;
    type State = Vec<T::State>;

    fn shrink<'wlong: 'wshort, 'wshort>(item: QueryItem<'wlong, Self>) -> QueryItem<'wshort, Self> {
        item.into_iter().map(|item| T::shrink(item)).collect()
    }

    const IS_DENSE: bool = T::IS_DENSE;
    const IS_ARCHETYPAL: bool = T::IS_ARCHETYPAL;

    unsafe fn init_fetch<'w>(
        world: &'w World,
        state: &Vec<T::State>,
        last_change_tick: u32,
        change_tick: u32,
    ) -> <Self as WorldQueryGats<'w>>::Fetch {
        state
            .iter()
            .map(|state| T::init_fetch(world, state, last_change_tick, change_tick))
            .collect()
    }

    #[inline]
    unsafe fn set_archetype<'w>(
        fetch: &mut <Self as WorldQueryGats<'w>>::Fetch,
        state: &Vec<T::State>,
        archetype: &'w Archetype,
        tables: &'w Tables,
    ) {
        for (fetch, state) in fetch.iter_mut().zip(state.iter()) {
            T::set_archetype(fetch, state, archetype, tables)
        }
    }

    #[inline]
    unsafe fn set_table<'w>(
        fetch: &mut <Self as WorldQueryGats<'w>>::Fetch,
        state: &Self::State,
        table: &'w Table,
    ) {
        for (fetch, state) in fetch.iter_mut().zip(state.iter()) {
            T::set_table(fetch, state, table)
        }
    }

    #[inline]
    unsafe fn archetype_fetch<'w>(
        fetch: &mut <Self as WorldQueryGats<'w>>::Fetch,
        archetype_index: usize,
    ) -> <Self as WorldQueryGats<'w>>::Item {
        fetch
            .iter_mut()
            .map(|fetch| T::archetype_fetch(fetch, archetype_index))
            .collect()
    }

    #[inline]
    unsafe fn table_fetch<'w>(
        fetch: &mut <Self as WorldQueryGats<'w>>::Fetch,
        table_row: usize,
    ) -> <Self as WorldQueryGats<'w>>::Item {
        fetch
            .iter_mut()
            .map(|fetch| T::archetype_fetch(fetch, table_row))
            .collect()
    }

    #[inline]
    unsafe fn table_filter_fetch(
        fetch: &mut <Self as WorldQueryGats<'_>>::Fetch,
        table_row: usize,
    ) -> bool {
        fetch.iter_mut().fold(true, |fold, fetch| {
            fold && T::table_filter_fetch(fetch, table_row)
        })
    }

    #[inline]
    unsafe fn archetype_filter_fetch(
        fetch: &mut <Self as WorldQueryGats<'_>>::Fetch,
        archetype_index: usize,
    ) -> bool {
        fetch.iter_mut().fold(true, |fold, fetch| {
            fold && T::archetype_filter_fetch(fetch, archetype_index)
        })
    }

    fn update_component_access(state: &Self::State, access: &mut FilteredAccess<ComponentId>) {
        for state in state.iter() {
            T::update_component_access(state, access);
        }
    }

    fn update_archetype_component_access(
        state: &Self::State,
        archetype: &Archetype,
        access: &mut Access<ArchetypeComponentId>,
    ) {
        for state in state.iter() {
            T::update_archetype_component_access(state, archetype, access);
        }
    }

    fn init_state(_world: &mut World) -> Self::State {
        panic!("Dynamic queries can only be initialized through QueryState::new_with_state");
    }

    fn matches_component_set(
        state: &Self::State,
        set_contains_id: &impl Fn(ComponentId) -> bool,
    ) -> bool {
        state.iter().fold(true, |fold, state| {
            fold && T::matches_component_set(state, set_contains_id)
        })
    }
}
