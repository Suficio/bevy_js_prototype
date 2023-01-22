use bevy::{
    ecs::{
        archetype::{Archetype, ArchetypeComponentId},
        component::{ComponentId, StorageType},
        query::{Access, FilteredAccess, ReadOnlyWorldQuery, WorldQuery},
        storage::{ComponentSparseSet, Table, TableRow},
    },
    prelude::*,
    ptr::Ptr,
};

/// Type used to query components
pub struct ComponentPtr;

#[doc(hidden)]
pub struct ReadFetch<'w> {
    storage_type: StorageType,
    component_size: usize,

    table_components: Option<Ptr<'w>>,
    sparse_set: Option<&'w ComponentSparseSet>,
}

unsafe impl ReadOnlyWorldQuery for ComponentPtr {}

unsafe impl WorldQuery for ComponentPtr {
    type Fetch<'w> = ReadFetch<'w>;
    type Item<'w> = Ptr<'w>;
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
    ) -> ReadFetch<'w> {
        let component_info = world.components().get_info(component_id).unwrap();
        let storage_type = component_info.storage_type();

        ReadFetch {
            storage_type,
            component_size: component_info.layout().size(),

            table_components: None,
            sparse_set: (storage_type == StorageType::SparseSet)
                .then(|| world.storages().sparse_sets.get(component_id).unwrap()),
        }
    }

    unsafe fn clone_fetch<'w>(fetch: &Self::Fetch<'w>) -> Self::Fetch<'w> {
        ReadFetch {
            storage_type: fetch.storage_type,
            component_size: fetch.component_size,

            table_components: fetch.table_components,
            sparse_set: fetch.sparse_set,
        }
    }

    const IS_DENSE: bool = false;
    const IS_ARCHETYPAL: bool = true;

    #[inline]
    unsafe fn set_archetype<'w>(
        fetch: &mut ReadFetch<'w>,
        component_id: &ComponentId,
        _archetype: &'w Archetype,
        table: &'w Table,
    ) {
        if fetch.storage_type == StorageType::Table {
            Self::set_table(fetch, component_id, table);
        }
    }

    #[inline]
    unsafe fn set_table<'w>(
        fetch: &mut ReadFetch<'w>,
        &component_id: &ComponentId,
        table: &'w Table,
    ) {
        fetch.table_components = Some(table.get_column(component_id).unwrap().get_data_ptr());
    }

    #[inline(always)]
    unsafe fn fetch<'w>(
        fetch: &mut Self::Fetch<'w>,
        entity: Entity,
        table_row: TableRow,
    ) -> Self::Item<'w> {
        match fetch.storage_type {
            StorageType::Table => fetch
                .table_components
                .unwrap()
                .byte_add(table_row.index() * fetch.component_size),
            StorageType::SparseSet => fetch.sparse_set.unwrap().get(entity).unwrap(),
        }
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
