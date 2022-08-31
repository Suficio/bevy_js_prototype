"use strict";

const { World, Entity } = Bevy;
export { World, Entity };

export class Reflectable {
  constructor() {}

  static reflect() {
    let obj = {};
    obj[this.typeName()] = this;
    return obj;
  }
}

export class ReflectableObject extends Object {
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

export class ReflectableArray extends Array {
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

export class ReflectableEnum extends Object {
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

export class ReflectableUnit extends String {
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
