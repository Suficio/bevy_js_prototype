"use strict";

((window) => {
  const { core } = window.Deno;
  const { Entity, worldResourceId } = window.bevyEcs;

  class World {
    static entity(eEntity) {
      return new Entity(eEntity);
    }

    static spawn() {
      let eEntity = core.ops.op_entity_spawn(worldResourceId());
      return new Entity(eEntity);
    }
  }

  Object.assign(window.bevyEcs, { World });
})(globalThis);
