"use strict";

((window) => {
  const { core } = window.Deno;
  const { reflect, worldResourceId, Bundle } = window.Bevy.ecs;

  class Entity {
    constructor(eEntity) {
      if (eEntity) {
        this.entity = eEntity;
      } else {
        this.entity = core.ops.op_entity_spawn(worldResourceId);
      }
    }

    id() {
      return this.eEntity;
    }

    insert(maybeComponent) {
      if (maybeComponent instanceof Bundle) {
        try {
          for (const component of Object.values(maybeComponent)) {
            this.insert(component);
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
        let reflected = reflect(maybeComponent);

        try {
          core.ops.op_entity_insert_component(
            worldResourceId,
            this.entity,
            reflected
          );
        } catch (err) {
          throw new Error(
            `Could not insert component: ${component.typeName()} into entity: ${
              this.entity
            }
${err}`
          );
        }
      }

      return this;
    }

    get(constructor) {
      try {
        let res = core.ops.op_entity_get_component(
          worldResourceId,
          this.entity,
          constructor.typeName
        );

        return new constructor(res);
      } catch (err) {
        throw new Error(
          `Could not get component: ${constructor.typeName} from entity: ${this.entity}
${err}`
        );
      }
    }
  }

  Object.assign(window.Bevy.ecs, { Entity });
})(globalThis);
