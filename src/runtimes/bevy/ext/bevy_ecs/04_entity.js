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
          `Could not insert component into entity: ${this.entity}
${JSON.stringify(reflected)}
${err}`
        );
      }

      return this;
    }
  }

  Object.assign(window.bevyEcs, { Entity });
})(globalThis);
