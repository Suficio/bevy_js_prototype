"use strict";

((window) => {
  const { core } = window.Deno;
  const { unwrapReflect, worldResourceId } = window.Bevy.ecs;

  class Query {
    constructor() {}
  }

  Object.assign(window.Bevy.ecs, { Query });
})(globalThis);
