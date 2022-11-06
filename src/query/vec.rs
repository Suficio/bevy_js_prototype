use bevy::{
    ecs::{
        archetype::{Archetype, ArchetypeComponentId},
        component::ComponentId,
        query::{Access, FilteredAccess, QueryItem, ReadOnlyWorldQuery, WorldQuery},
        storage::Table,
    },
    prelude::*,
};

use std::marker::PhantomData;

/// Type used to query dense components
pub struct VecPtr<T> {
    _phantom: PhantomData<T>,
}

/// SAFETY: each item in the vec is read only
unsafe impl<T> ReadOnlyWorldQuery for VecPtr<T> where T: ReadOnlyWorldQuery {}

unsafe impl<T> WorldQuery for VecPtr<T>
where
    T: WorldQuery,
{
    type Fetch<'w> = Vec<T::Fetch<'w>>;
    type Item<'w> = Vec<T::Item<'w>>;
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
    ) -> Self::Fetch<'w> {
        state
            .iter()
            .map(|state| T::init_fetch(world, state, last_change_tick, change_tick))
            .collect()
    }

    unsafe fn clone_fetch<'w>(fetch: &Self::Fetch<'w>) -> Self::Fetch<'w> {
        fetch.into_iter().map(|item| T::clone_fetch(item)).collect()
    }

    #[inline]
    unsafe fn set_archetype<'w>(
        fetch: &mut Self::Fetch<'w>,
        state: &Vec<T::State>,
        archetype: &'w Archetype,
        table: &'w Table,
    ) {
        for (fetch, state) in fetch.iter_mut().zip(state.iter()) {
            T::set_archetype(fetch, state, archetype, table)
        }
    }

    #[inline]
    unsafe fn set_table<'w>(fetch: &mut Self::Fetch<'w>, state: &Self::State, table: &'w Table) {
        for (fetch, state) in fetch.iter_mut().zip(state.iter()) {
            T::set_table(fetch, state, table)
        }
    }

    #[inline]
    unsafe fn fetch<'w>(
        fetch: &mut Self::Fetch<'w>,
        entity: Entity,
        table_row: usize,
    ) -> Self::Item<'w> {
        fetch
            .iter_mut()
            .map(|fetch| T::fetch(fetch, entity, table_row))
            .collect()
    }

    #[inline]
    unsafe fn filter_fetch<'w>(
        fetch: &mut Self::Fetch<'w>,
        entity: Entity,
        table_row: usize,
    ) -> bool {
        fetch.iter_mut().fold(true, |fold, fetch| {
            fold && T::filter_fetch(fetch, entity, table_row)
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
