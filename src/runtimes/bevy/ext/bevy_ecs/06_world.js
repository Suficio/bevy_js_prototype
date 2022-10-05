"use strict";

((window) => {
  const { ops } = window.Deno.core;
  const { Entity, TypeRegistry } = window.Bevy.ecs;

  class World {
    constructor(worldResourceId) {
      this.worldResourceId = worldResourceId;
    }

    static spawn(worldResourceId) {
      if (!worldResourceId) {
        throw new Error("World resource ID must be provided");
      }

      const id = new Uint8Array(8);
      ops.op_world_entity_spawn(worldResourceId, id.buffer);
      return new Entity(worldResourceId, id);
    }

    static getResource(worldResourceId, constructor) {
      if (!worldResourceId) {
        throw new Error("World resource ID must be provided");
      }
      if (!constructor) {
        throw new Error("Constructor must be provided");
      }

      try {
        let res = ops.op_world_get_resource(
          worldResourceId,
          constructor.typeName()
        );

        return new constructor(res);
      } catch (err) {
        throw new Error(
          `Could not get resource: ${constructor.typeName()} from entity: ${
            this.entity
          }
${err}`
        );
      }
    }

    typeRegistry() {
      return new TypeRegistry(this.worldResourceId);
    }

    spawn() {
      return World.spawn(this.worldResourceId);
    }

    getResource(constructor) {
      return World.getResource(this.worldResourceId, constructor);
    }
  }

  Object.assign(window.Bevy.ecs, { World });
})(globalThis);
