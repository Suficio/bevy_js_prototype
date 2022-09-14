"use strict";

((window) => {
  function reflect() {
    const obj = {};
    obj[this.typeName()] = this;
    return obj;
  }

  class ReflectableObject extends Object {
    constructor(defaults, struct) {
      super();
      Object.assign(this, defaults, struct);
    }

    static typeName() {
      throw new Error("ReflectableObject must implement typeName");
    }

    typeName() {
      return this.constructor.typeName();
    }

    reflect() {
      return reflect.call(this);
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

    static typeName() {
      throw new Error("ReflectableArray must implement typeName");
    }

    typeName() {
      return this.constructor.typeName();
    }

    reflect() {
      return reflect.call(this);
    }
  }

  class ReflectableEnum extends Object {
    constructor(type, value) {
      super();
      this[type] = value;
    }

    static typeName() {
      throw new Error("ReflectableEnum must implement typeName");
    }

    typeName() {
      return this.constructor.typeName();
    }

    reflect() {
      return reflect.call(this);
    }
  }

  class ReflectableUnit extends String {
    constructor(value) {
      super(value);
    }

    static typeName() {
      throw new Error("ReflectableUnit must implement typeName");
    }

    typeName() {
      return this.constructor.typeName();
    }

    reflect() {
      return reflect.call(this);
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

  Object.assign(window.bevyEcs, {
    Bundle,
    ReflectableObject,
    ReflectableArray,
    ReflectableEnum,
    ReflectableUnit,
  });
})(globalThis);
