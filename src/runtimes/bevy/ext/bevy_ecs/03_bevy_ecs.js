"use strict";
((window) => {
  class TypeRegistry {
    constructor(worldResourceId) {
      this.worldResourceId = worldResourceId;
    }

    // TODO: Could eventually return TypeRegistration but there is no need thus far
    static getTypeIdWithName(worldResourceId, typeName) {
      try {
        const buffer = Uint8Array(8);
        ops.op_type_registry_get_type_id_with_name(
          worldResourceId,
          typeName,
          buffer
        );
        return buffer;
      } catch (err) {
        throw new Error(
          `Could not get type ID for type name: ${typeName}
${err}`
        );
      }
    }

    getTypeIdWithName(typeName) {
      return TypeRegistry.getTypeIdWithName(this.worldResourceId, typeName);
    }
  }

  class Reflect {
    static assignTypeId(worldResourceId, prototype) {
      prototype.typeId = TypeRegistry.getTypeIdWithName(
        worldResourceId,
        prototype.typeName
      );
    }

    static reflect(reflectable) {
      const obj = {};
      obj[reflectable.typeName()] = reflectable;
      return obj;
    }
  }

  class ReflectableObject extends Object {
    constructor(defaults, struct) {
      super();
      Object.assign(this, defaults, struct);
    }

    typeName() {
      return this.prototype.typeName;
    }

    typeId() {
      return this.prototype.typeId;
    }

    reflect() {
      return Reflect.reflect(this);
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
      return this.prototype.typeName;
    }

    typeId() {
      return this.prototype.typeId;
    }

    reflect() {
      return Reflect.reflect(this);
    }
  }

  class ReflectableEnum extends Object {
    constructor(type, value) {
      super();
      this[type] = value;
    }

    typeName() {
      return this.prototype.typeName;
    }

    typeId() {
      return this.prototype.typeId;
    }

    reflect() {
      return Reflect.reflect(this);
    }
  }

  class ReflectableUnit extends String {
    constructor(value) {
      super(value);
    }

    typeName() {
      return this.prototype.typeName;
    }

    typeId() {
      return this.prototype.typeId;
    }

    reflect() {
      return Reflect.reflect(this);
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

  if (!window.hasOwnProperty("bevyEcs")) {
    window.bevyEcs = {};
  }
  Object.assign(window.bevyEcs, {
    Bundle,
    Reflect,
    ReflectableObject,
    ReflectableArray,
    ReflectableEnum,
    ReflectableUnit,
    TypeRegistry,
  });
})(globalThis);
