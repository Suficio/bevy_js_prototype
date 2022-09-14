"use strict";

((window) => {
  const { core } = window.Deno;
  const { reflect, worldResourceId } = window.bevyEcs;

  class Entity {
    constructor(eEntity) {
      if (eEntity) {
        this.entity = eEntity;
      } else {
        this.entity = core.ops.op_entity_spawn(worldResourceId());
      }
    }

    id() {
      return this.eEntity;
    }

    insert(component) {
      let reflected = reflect(component);

      try {
        core.ops.op_entity_insert_component(
          worldResourceId(),
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

      return this;
    }

    insertBundle(bundle) {
      try {
        for (const component of Object.values(bundle)) {
          this.insert(component);
        }
      } catch (err) {
        throw new Error(
          `Could not insert bundle: ${bundle.bundleName()} into entity: ${
            this.entity
          }
${err}`
        );
      }

      return this;
    }

    get(component) {
      try {
        let res = core.ops.op_entity_get_component(
          worldResourceId(),
          this.entity,
          component.typeName()
        );

        return new component(res);
      } catch (err) {
        throw new Error(
          `Could not get component: ${component.typeName()} from entity: ${
            this.entity
          }
${err}`
        );
      }
    }
  }

  Object.assign(window.bevyEcs, { Entity });
})(globalThis);
