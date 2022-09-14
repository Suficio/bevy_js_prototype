"use strict";

((window) => {
  const { core } = window.Deno;
  const { reflect, worldResourceId } = window.bevyEcs;

  class Entity {
    constructor(eEntity) {
      this.entity = eEntity;
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
          `Could not insert component: ${reflected.typeName()} into entity: ${
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
  }

  Object.assign(window.bevyEcs, { Entity });
})(globalThis);
