"use strict";

((window) => {
  const { core } = window.Deno;
  const { worldResourceId, reflect } = window.bevyEcs;

  class Reflectable {
    constructor() {}

    static reflect() {
      const obj = {};
      obj[this.typeName()] = this;
      return obj;
    }
  }

  class ReflectableObject extends Object {
    constructor(defaults, struct) {
      super();
      Object.assign(this, defaults, struct);
    }

    typeName() {
      throw new Error("ReflectableObject must implement typeName");
    }

    reflect() {
      return Reflectable.reflect.call(this);
    }
  }

  class ReflectableArray extends Array {
    constructor(defaults, seq) {
      super();

      if (seq && !(seq instanceof Array)) {
        seq = [seq];
      }

      Object.assign(this, defaults, seq);
    }

    typeName() {
      throw new Error("ReflectableArray must implement typeName");
    }

    reflect() {
      return Reflectable.reflect.call(this);
    }
  }

  class ReflectableEnum extends Object {
    constructor(type, value) {
      super();
      this[type] = value;
    }

    typeName() {
      throw new Error("ReflectableEnum must implement typeName");
    }

    reflect() {
      return Reflectable.reflect.call(this);
    }
  }

  class ReflectableUnit extends String {
    constructor(value) {
      super(value);
    }

    typeName() {
      throw new Error("ReflectableUnit must implement typeName");
    }

    reflect() {
      return Reflectable.reflect.call(this);
    }
  }

  class TypeRegistry {
    static register(reflectable) {
      const reflected = reflect(reflectable);

      try {
        core.ops.op_type_registry_register(worldResourceId(), reflected);
      } catch (err) {
        throw new Error(
          `Could not register type:
${JSON.stringify(reflected)}
${err}`
        );
      }
    }
  }

  Object.assign(window.bevyEcs, {
    Reflectable,
    ReflectableObject,
    ReflectableArray,
    ReflectableEnum,
    ReflectableUnit,
    TypeRegistry,
  });
})(globalThis);
