"use strict";

((window) => {
  const { core } = window.Deno;
  const { unwrapReflect, Bundle } = window.Bevy.ecs;

  class Entity extends Map {
    constructor(worldResourceId, id) {
      if (worldResourceId == undefined) {
        throw new Error("World resource ID must be provided");
      }
      if (id == undefined || !(id instanceof Uint8Array)) {
        throw new Error("Entity ID must be provided and must be Uint8Array");
      }

      super();
      this.worldResourceId = worldResourceId;
      this.id = id;
    }

    static insert(worldResourceId, id, maybeComponent) {
      if (maybeComponent instanceof Bundle) {
        try {
          for (const component of Object.values(maybeComponent)) {
            this.insert(worldResourceId, id, component);
          }
        } catch (err) {
          throw new Error(
            `Could not insert bundle: ${maybeComponent.bundleName()} into entity: ${
              this.entity
            }
${err}`
          );
        }
      } else {
        let reflected = unwrapReflect(maybeComponent);
        try {
          core.ops.op_entity_insert_component(
            worldResourceId,
            id,
            maybeComponent.typeId(),
            reflected
          );
        } catch (err) {
          throw new Error(
            `Could not insert component: ${maybeComponent.typeName()} into entity: ${id}
${err}`
          );
        }
      }

      return this;
    }

    static get(worldResourceId, id, constructor) {
      try {
        let res = core.ops.op_entity_get_component(
          worldResourceId,
          id,
          constructor.typeId
        );

        return new constructor(res);
      } catch (err) {
        throw new Error(
          `Could not get component: ${constructor.typeName} from entity: ${id}
${err}`
        );
      }
    }

    insert(maybeComponent) {
      return Entity.insert(this.worldResourceId, this.id, maybeComponent);
    }

    get(constructor) {
      return Entity.get(this.worldResourceId, this.id, constructor);
    }
  }

  Object.assign(window.Bevy.ecs, { Entity });
})(globalThis);
