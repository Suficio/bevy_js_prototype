"use strict";

((window) => {
  const core = window.__bootstrap.core;

  // Need to instruct how to serialize BigInt
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  // Cache global reference to the `World` resource
  let rWorld = undefined;

  function worldResourceId() {
    if (rWorld) {
      return rWorld;
    } else {
      let res = core.resources();
      let rid = Object.keys(res).find(
        (rid) => res[rid] === "bevy_js::world::WorldResource"
      );
      if (rid === undefined) {
        throw new Error(
          "Could not find Bevy world resource id. Ensure that you are running within a Bevy context."
        );
      }

      return rWorld;
    }
  }

  class Entity {
    constructor(eEntity) {
      this.entity = eEntity;
    }

    id() {
      return this.eEntity;
    }

    insert(component) {
      let reflected = component.reflect();

      try {
        core.opSync(
          "op_entity_insert_component",
          component,
          this.entity,
          reflected
        );
      } catch (error) {
        throw new Error(
          `Could not insert component into entity: ${this.entity}
${JSON.stringify(reflected)}
${error}`
        );
      }
    }
  }

  class World {
    constructor() {
      if (rWorld === worldResourceId()) {
        throw new Error("World was not borrowed when constructing World in JS");
      }
    }

    entity(eEntity) {
      return new Entity(eEntity);
    }

    spawn() {
      let eEntity = core.opSync("op_entity_spawn", worldResourceId());
      return new Entity(eEntity);
    }
  }

  async function system() {
    await core.opAsync("op_request_system", worldResourceId());
  }

  let bevyEcs = {
    system,
    Entity,
    World,
    worldResourceId,
  };
  Object.assign(window, { bevyEcs });
})(globalThis);
