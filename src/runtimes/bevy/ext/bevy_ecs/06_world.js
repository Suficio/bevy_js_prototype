"use strict";

((window) => {
  const { ops } = window.Deno.core;
  const { Entity, TypeRegistry, Query } = window.Bevy.ecs;

  class World {
    constructor(worldResourceId) {
      this.worldResourceId = worldResourceId;
    }

    static getResource(worldResourceId, constructor) {
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

    static query(worldResourceId, fetch) {
      return new Query(worldResourceId, fetch, null);
    }

    static queryFiltered(worldResourceId, fetch, filter) {
      return new Query(worldResourceId, fetch, filter);
    }

    static spawnEmpty(worldResourceId) {
      const id = new ArrayBuffer(8);
      ops.op_world_entity_spawn(worldResourceId, id);
      return new Entity(worldResourceId, id);
    }

    typeRegistry() {
      return new TypeRegistry(this.worldResourceId);
    }

    getResource(constructor) {
      return World.getResource(this.worldResourceId, constructor);
    }

    query(fetch) {
      return World.query(this.worldResourceId, fetch);
    }

    queryFiltered(fetch, filter) {
      return World.queryFiltered(this.worldResourceId, fetch, filter);
    }

    spawnEmpty() {
      return World.spawnEmpty(this.worldResourceId);
    }
  }

  Object.assign(window.Bevy.ecs, { World });
})(globalThis);
