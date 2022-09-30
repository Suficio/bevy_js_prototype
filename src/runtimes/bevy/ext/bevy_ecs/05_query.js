"use strict";

((window) => {
  const { core } = window.Deno;
  const { reflect, worldResourceId } = window.bevyEcs;

  class Query {
    constructor() {}
  }

  Object.assign(window.bevyEcs, { Query });
})(globalThis);
