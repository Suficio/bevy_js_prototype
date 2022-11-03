"use strict";

((window) => {
  const { core } = window.Deno;
  const { worldResourceId } = window.Bevy.ecs;

  class Query {
    constructor() {}
  }

  Object.assign(window.Bevy.ecs, { Query });
})(globalThis);
