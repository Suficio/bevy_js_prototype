"use strict";

((window) => {
  const { core } = window.Deno;
  const { Bundle, ReflectableArray } = window.Bevy.ecs;

  class Entity {
    constructor(worldResourceId, id) {
      if (worldResourceId == undefined) {
        throw new Error("World resource ID must be provided");
      }
      if (id == undefined || !(id instanceof ArrayBuffer)) {
        throw new Error(
          "Entity ID must be provided and must be an ArrayBuffer"
        );
      }

      this.worldResourceId = worldResourceId;
      this.id = id;
    }

    static insert(worldResourceId, id, maybeBundle) {
      recursiveInsert(worldResourceId, id, maybeBundle);
      return this;
    }

    static get(worldResourceId, id, constructor) {
      return core.ops.op_entity_get_component(worldResourceId, id, constructor);
    }

    insert(component) {
      return Entity.insert(this.worldResourceId, this.id, component);
    }

    get(constructor) {
      return Entity.get(this.worldResourceId, this.id, constructor);
    }
  }

  // TODO: Specialize on Rust side
  function recursiveInsert(worldResourceId, id, maybeBundle) {
    if (maybeBundle instanceof Bundle) {
      for (const component of Object.values(maybeBundle)) {
        recursiveInsert(worldResourceId, id, component);
      }
    } else if (
      // `ReflectableArray` must be ruled out as it is also an instance of
      // `Array`
      !(maybeBundle instanceof ReflectableArray) &&
      maybeBundle instanceof Array
    ) {
      for (const component of maybeBundle) {
        recursiveInsert(worldResourceId, id, component);
      }
    } else {
      core.ops.op_entity_insert_component(worldResourceId, id, maybeBundle);
    }
  }

  Object.assign(window.Bevy.ecs, { Entity });
})(globalThis);
