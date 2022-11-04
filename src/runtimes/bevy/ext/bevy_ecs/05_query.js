"use strict";

((window) => {
  const { ops } = window.Deno.core;

  class Query {
    constructor(worldResourceId, fetch, filter = null) {
      if (filter != null) {
        throw new Error("Filter in Query not supported");
      }

      this.worldResourceId = worldResourceId;
      this.resourceId = ops.op_query_initialize(worldResourceId, fetch, filter);
    }
  }

  Object.assign(window.Bevy.ecs, { Query });
})(globalThis);
