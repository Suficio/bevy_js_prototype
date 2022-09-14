"use strict";

((window) => {
  const { core } = window.Deno;
  const { Entity, worldResourceId } = window.bevyEcs;

  class World {
    static entity(eEntity) {
      return new Entity(eEntity);
    }

    static spawn() {
      return new Entity();
    }

    static getResource(constructor) {
      let res = core.ops.op_world_get_resource(
        worldResourceId(),
        constructor.typeName()
      );
      Deno.core.print(JSON.stringify(res));
    }

    static insertResource() {}
  }

  Object.assign(window.bevyEcs, { World });
})(globalThis);
