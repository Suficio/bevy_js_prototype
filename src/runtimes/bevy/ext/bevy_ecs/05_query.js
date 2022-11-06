"use strict";

((window) => {
  const { ops } = window.Deno.core;
  const { Entity } = window.Bevy.ecs;

  class Query {
    constructor(worldResourceId, fetch, filter = null) {
      this.worldResourceId = worldResourceId;
      this.resourceId = Query.initialize(worldResourceId, fetch, filter);
    }

    static initialize(worldResourceId, fetch, filter = null) {
      if (filter != null) {
        throw new Error("Filter in Query not supported");
      }

      return ops.op_query_initialize(worldResourceId, fetch, filter);
    }

    static iter(worldResourceId, queryResourceId, callbackFn) {
      ops.op_query_iter(worldResourceId, queryResourceId, (entity, ...args) =>
        callbackFn(new Entity(worldResourceId, entity), ...args)
      );
    }

    iter(callbackFn) {
      Query.iter(this.worldResourceId, this.resourceId, callbackFn);
    }
  }

  Object.assign(window.Bevy.ecs, { Query });
})(globalThis);
