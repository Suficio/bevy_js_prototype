use bevy::{
    ecs::{
        archetype::{Archetype, ArchetypeComponentId},
        component::ComponentId,
        query::{Access, FilteredAccess, ReadOnlyWorldQuery, WorldQuery},
        storage::{Table, TableRow},
    },
    prelude::*,
};

pub enum Filter {
    With(ComponentId),
    Without(ComponentId),
}

// SAFETY: `Self::ReadOnly` is the same as `Self`
unsafe impl WorldQuery for Filter {
    type Fetch<'w> = ();
    type Item<'w> = ();
    type ReadOnly = Self;
    type State = Filter;

    fn shrink<'wlong: 'wshort, 'wshort>(_: Self::Item<'wlong>) -> Self::Item<'wshort> {}

    unsafe fn init_fetch(
        _world: &World,
        _state: &Filter,
        _last_change_tick: u32,
        _change_tick: u32,
    ) {
    }

    unsafe fn clone_fetch<'w>(_fetch: &Self::Fetch<'w>) -> Self::Fetch<'w> {}

    const IS_DENSE: bool = false;
    const IS_ARCHETYPAL: bool = true;

    #[inline]
    unsafe fn set_table(_fetch: &mut (), _state: &Filter, _table: &Table) {}

    #[inline]
    unsafe fn set_archetype(
        _fetch: &mut (),
        _state: &Filter,
        _archetype: &Archetype,
        _table: &Table,
    ) {
    }

    #[inline(always)]
    unsafe fn fetch<'w>(
        _fetch: &mut Self::Fetch<'w>,
        _entity: Entity,
        _table_row: TableRow,
    ) -> Self::Item<'w> {
    }

    #[inline]
    fn update_component_access(state: &Filter, access: &mut FilteredAccess<ComponentId>) {
        match state {
            Filter::With(id) | Filter::Without(id) => access.add_with(*id),
        }
    }

    #[inline]
    fn update_archetype_component_access(
        _state: &Filter,
        _archetype: &Archetype,
        _access: &mut Access<ArchetypeComponentId>,
    ) {
    }

    fn init_state(_world: &mut World) -> Filter {
        panic!("Dynamic filters can only be initialized through QueryState::new_with_state");
    }

    fn matches_component_set(
        state: &Filter,
        set_contains_id: &impl Fn(ComponentId) -> bool,
    ) -> bool {
        match state {
            Filter::With(id) => set_contains_id(*id),
            Filter::Without(id) => !set_contains_id(*id),
        }
    }
}

// SAFETY: no component access or archetype component access
unsafe impl ReadOnlyWorldQuery for Filter {}
