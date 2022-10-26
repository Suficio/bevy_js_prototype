"use strict";

((window) => {
  const { core } = window.Deno;
  const { worldResourceId } = window.Bevy.ecs;

  class Query {
    constructor(worldResourceId) {
      this.worldResourceId = worldResourceId;
    }

    static query(fetch) {

    }

    static queryFiltered(fetch, filter) {}
  }

  Object.assign(window.Bevy.ecs, { Query });
})(globalThis);
