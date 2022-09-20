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

    static getResource(resource) {
      try {
        let res = core.ops.op_world_get_resource(
          worldResourceId(),
          resource.typeName()
        );

        return new resource(res);
      } catch (err) {
        throw new Error(
          `Could not get resource: ${resource.typeName()} from entity: ${
            this.entity
          }
${err}`
        );
      }
    }

    // TODO: static insertResource() {}
  }

  Object.assign(window.bevyEcs, { World });
})(globalThis);
