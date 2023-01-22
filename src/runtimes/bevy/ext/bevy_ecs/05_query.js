"use strict";

((window) => {
  const { ops } = window.Deno.core;
  const { Entity } = window.Bevy.ecs;

  class With {
    constructor(componentType) {
      this.componentType = componentType;
    }
  }

  class Without {
    constructor(componentType) {
      this.componentType = componentType;
    }
  }

  class Query {
    constructor(worldResourceId, fetch, filter = null) {
      this.worldResourceId = worldResourceId;
      this.resourceId = Query.initialize(worldResourceId, fetch, filter);
    }

    static initialize(worldResourceId, fetch, filter = null) {
      return ops.op_query_initialize(worldResourceId, fetch, filter);
    }

    static drop(resourceId) {
      return ops.op_query_drop(resourceId);
    }

    static iter(worldResourceId, queryResourceId, callbackFn) {
      ops.op_query_iter(worldResourceId, queryResourceId, (entity, args) => {
        const entity = new Entity(worldResourceId, entity);
        entity.insert = core.ops.op_entity_delegated_insert_component.bind(
          entity,
          queryResourceId
        );
        callbackFn(entity, args);
      });
    }

    drop() {
      return Query.drop(this.resourceId);
    }

    iter(callbackFn) {
      Query.iter(this.worldResourceId, this.resourceId, callbackFn);
    }
  }

  // Declare filters so Rust side can identify the filter types
  ops.op_declare_filters(With, Without);

  Object.assign(window.Bevy.ecs, { Query, With, Without });
})(globalThis);
