"use strict";
((window) => {
  const { core } = window.Deno;
  const { ops } = core;

  // Need to instruct how to serialize BigInt
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  // Evaluate worldResourceId at extension initialization
  const worldResourceId = (() => {
    let res = core.resources();
    let rid = Object.keys(res).find(
      (rid) => res[rid] === "bevy_js::world::WorldResource"
    );
    if (rid === undefined) {
      throw new Error(
        "Could not find Bevy world resource id. Ensure that you are running within a Bevy context."
      );
    }

    return rid;
  })();

  async function nextFrame() {
    await core.opAsync("op_wait_for_frame", worldResourceId);
  }

  class TypeRegistry {
    constructor(worldResourceId) {
      this.worldResourceId = worldResourceId;
    }

    static getTypeIdWithName(worldResourceId, typeName) {
      return ops.op_type_registry_get_type_id_with_name(
        worldResourceId,
        typeName
      );
    }

    static getComponentId(worldResourceId, typeId) {
      if (typeId == null) {
        return null;
      }

      return ops.op_type_registry_get_component_id_with_type_id(
        worldResourceId,
        typeId
      );
    }

    getTypeIdWithName(typeName) {
      return TypeRegistry.getTypeIdWithName(this.worldResourceId, typeName);
    }

    getComponentId(typeId) {
      return TypeRegistry.getComponentId(this.worldResourceId, typeId);
    }
  }

  class ReflectableObject extends Object {
    constructor(defaults, struct) {
      super();
      Object.assign(this, defaults, struct);
    }
  }

  class ReflectableArray extends Array {
    constructor(defaults, seq) {
      super();

      if (seq && !(seq instanceof Array)) {
        seq = Object.assign([], seq);
      }

      Object.assign(this, defaults, seq);
    }
  }

  class ReflectableEnum extends Object {
    constructor(type, value) {
      super();
      this[type] = value;
    }
  }

  class ReflectableUnit extends String {
    constructor(value) {
      super(value);
    }
  }

  class Bundle extends Object {
    constructor(defaults, struct) {
      super();
      Object.assign(this, defaults, struct);
    }

    bundleName() {
      return this.constructor.name;
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("ecs")) {
    window.Bevy.ecs = {};
  }
  Object.assign(window.Bevy.ecs, {
    worldResourceId,
    nextFrame,
    Bundle,
    Reflect,
    ReflectableObject,
    ReflectableArray,
    ReflectableEnum,
    ReflectableUnit,
    TypeRegistry,
  });
})(globalThis);
