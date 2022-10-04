"use strict";

((window) => {
  const { ops } = window.Deno.core;
  const { Entity } = window.Bevy.ecs;

  class World {
    constructor(worldResourceId) {
      this.worldResourceId = worldResourceId;
    }

    static entity(eEntity) {
      return new Entity(eEntity);
    }

    static spawn() {
      return new Entity();
    }

    static getResource(worldResourceId, resourceConstructor) {
      try {
        let res = ops.op_world_get_resource(
          worldResourceId,
          resourceConstructor.typeName()
        );

        return new resourceConstructor(res);
      } catch (err) {
        throw new Error(
          `Could not get resource: ${resourceConstructor.typeName()} from entity: ${
            this.entity
          }
${err}`
        );
      }
    }

    typeRegistry() {
      return new TypeRegistry(this.worldResourceId);
    }

    getResource(resourceConstructor) {
      return World.getResource(this.worldResourceId, resourceConstructor);
    }
  }

  Object.assign(window.Bevy.ecs, { World });
})(globalThis);
