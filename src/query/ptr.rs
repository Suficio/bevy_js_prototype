use super::debug_checked_unreachable;
use bevy::{
    ecs::{
        archetype::{Archetype, ArchetypeComponentId},
        component::{ComponentId, StorageType},
        query::{Access, FilteredAccess, ReadOnlyWorldQuery, WorldQuery, WorldQueryGats},
        storage::{ComponentSparseSet, Table, Tables},
    },
    prelude::*,
    ptr::{Ptr, ThinSlicePtr},
};

/// Type used to query dense components
pub struct ComponentPtrDense;

#[doc(hidden)]
pub struct ReadFetchDense<'w> {
    component_size: usize,
    // T::Storage = TableStorage
    table_components: Option<Ptr<'w>>,
    entity_table_rows: Option<ThinSlicePtr<'w, usize>>,
}

impl<'w> WorldQueryGats<'w> for &ComponentPtrDense {
    type Item = Ptr<'w>;
    type Fetch = ReadFetchDense<'w>;
}

unsafe impl ReadOnlyWorldQuery for &ComponentPtrDense {}

unsafe impl WorldQuery for &ComponentPtrDense {
    type ReadOnly = Self;
    type State = ComponentId;

    fn shrink<'wlong: 'wshort, 'wshort>(item: Ptr<'wlong>) -> Ptr<'wshort> {
        item
    }

    const IS_DENSE: bool = true;
    const IS_ARCHETYPAL: bool = true;

    unsafe fn init_fetch<'w>(
        world: &'w World,
        &component_id: &ComponentId,
        _last_change_tick: u32,
        _change_tick: u32,
    ) -> ReadFetchDense<'w> {
        let component_info = world.components().get_info(component_id).unwrap();

        debug_assert_eq!(component_info.storage_type(), StorageType::Table);

        ReadFetchDense {
            component_size: component_info.layout().size(),
            table_components: None,
            entity_table_rows: None,
        }
    }

    #[inline]
    unsafe fn set_archetype<'w>(
        fetch: &mut ReadFetchDense<'w>,
        &component_id: &ComponentId,
        archetype: &'w Archetype,
        tables: &'w Tables,
    ) {
        fetch.entity_table_rows = Some(archetype.entity_table_rows().into());
        let column = tables[archetype.table_id()]
            .get_column(component_id)
            .unwrap();
        fetch.table_components = Some(column.get_data_ptr());
    }

    #[inline]
    unsafe fn set_table<'w>(
        fetch: &mut ReadFetchDense<'w>,
        &component_id: &ComponentId,
        table: &'w Table,
    ) {
        fetch.table_components = Some(table.get_column(component_id).unwrap().get_data_ptr());
    }

    #[inline]
    unsafe fn archetype_fetch<'w>(
        fetch: &mut <Self as WorldQueryGats<'w>>::Fetch,
        archetype_index: usize,
    ) -> <Self as WorldQueryGats<'w>>::Item {
        let (entity_table_rows, table_components) = fetch
            .entity_table_rows
            .zip(fetch.table_components)
            .unwrap_or_else(|| debug_checked_unreachable());

        let table_row = *entity_table_rows.get(archetype_index);
        table_components.byte_add(table_row * fetch.component_size)
    }

    #[inline]
    unsafe fn table_fetch<'w>(
        fetch: &mut <Self as WorldQueryGats<'w>>::Fetch,
        table_row: usize,
    ) -> <Self as WorldQueryGats<'w>>::Item {
        let components = fetch
            .table_components
            .unwrap_or_else(|| debug_checked_unreachable());
        components.byte_add(table_row * fetch.component_size)
    }

    fn update_component_access(
        &component_id: &ComponentId,
        access: &mut FilteredAccess<ComponentId>,
    ) {
        assert!(
            !access.access().has_write(component_id),
            "Read access to component with id: {:?} conflicts with a previous access in this query. Shared access cannot coincide with exclusive access.",
            component_id
        );
        access.add_read(component_id);
    }

    fn update_archetype_component_access(
        &component_id: &ComponentId,
        archetype: &Archetype,
        access: &mut Access<ArchetypeComponentId>,
    ) {
        if let Some(archetype_component_id) = archetype.get_archetype_component_id(component_id) {
            access.add_read(archetype_component_id);
        }
    }

    fn init_state(_world: &mut World) -> Self::State {
        panic!("Dynamic queries can only be initialized through QueryState::new_with_state");
    }

    fn matches_component_set(
        &component_id: &ComponentId,
        set_contains_id: &impl Fn(ComponentId) -> bool,
    ) -> bool {
        set_contains_id(component_id)
    }
}

/// Type used to query non-dense components
pub struct ComponentPtr;

#[doc(hidden)]
pub struct ReadFetchSparse<'w> {
    // T::Storage = SparseStorage
    entities: Option<ThinSlicePtr<'w, Entity>>,
    sparse_set: Option<&'w ComponentSparseSet>,
}

impl<'w> WorldQueryGats<'w> for &ComponentPtr {
    type Item = Ptr<'w>;
    type Fetch = ReadFetchSparse<'w>;
}

unsafe impl ReadOnlyWorldQuery for &ComponentPtr {}

unsafe impl WorldQuery for &ComponentPtr {
    type ReadOnly = Self;
    type State = ComponentId;

    fn shrink<'wlong: 'wshort, 'wshort>(item: Ptr<'wlong>) -> Ptr<'wshort> {
        item
    }

    unsafe fn init_fetch<'w>(
        world: &'w World,
        &component_id: &ComponentId,
        _last_change_tick: u32,
        _change_tick: u32,
    ) -> <Self as WorldQueryGats<'w>>::Fetch {
        let storage_type = world
            .components()
            .get_info(component_id)
            .unwrap()
            .storage_type();

        ReadFetchSparse {
            entities: None,
            sparse_set: (storage_type == StorageType::SparseSet)
                .then(|| world.storages().sparse_sets.get(component_id).unwrap()),
        }
    }

    const IS_DENSE: bool = false;
    const IS_ARCHETYPAL: bool = true;

    #[inline]
    unsafe fn set_archetype<'w>(
        fetch: &mut <Self as WorldQueryGats<'w>>::Fetch,
        _component_id: &ComponentId,
        archetype: &'w Archetype,
        _tables: &'w Tables,
    ) {
        fetch.entities = Some(archetype.entities().into())
    }

    #[inline]
    unsafe fn set_table<'w>(
        _fetch: &mut <Self as WorldQueryGats<'w>>::Fetch,
        _component_id: &ComponentId,
        _table: &'w Table,
    ) {
        panic!("hi");
        debug_checked_unreachable();
    }

    #[inline]
    unsafe fn archetype_fetch<'w>(
        fetch: &mut <Self as WorldQueryGats<'w>>::Fetch,
        archetype_index: usize,
    ) -> <Self as WorldQueryGats<'w>>::Item {
        let (entities, sparse_set) = fetch
            .entities
            .zip(fetch.sparse_set)
            .unwrap_or_else(|| debug_checked_unreachable());

        let entity = *entities.get(archetype_index);
        sparse_set
            .get(entity)
            .unwrap_or_else(|| debug_checked_unreachable())
    }

    #[inline]
    unsafe fn table_fetch<'w>(
        _fetch: &mut <Self as WorldQueryGats<'w>>::Fetch,
        _table_row: usize,
    ) -> <Self as WorldQueryGats<'w>>::Item {
        panic!("hi");
        debug_checked_unreachable();
    }

    fn update_component_access(
        &component_id: &ComponentId,
        access: &mut FilteredAccess<ComponentId>,
    ) {
        assert!(
            !access.access().has_write(component_id),
            "Read access to component with id: {:?} conflicts with a previous access in this query. Shared access cannot coincide with exclusive access.",
            component_id
        );
        access.add_read(component_id);
    }

    fn update_archetype_component_access(
        &component_id: &ComponentId,
        archetype: &Archetype,
        access: &mut Access<ArchetypeComponentId>,
    ) {
        if let Some(archetype_component_id) = archetype.get_archetype_component_id(component_id) {
            access.add_read(archetype_component_id);
        }
    }

    fn init_state(_world: &mut World) -> Self::State {
        panic!("Dynamic queries can only be initialized through QueryState::new_with_state");
    }

    fn matches_component_set(
        &component_id: &ComponentId,
        set_contains_id: &impl Fn(ComponentId) -> bool,
    ) -> bool {
        set_contains_id(component_id)
    }
}
