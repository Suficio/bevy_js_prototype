"use strict";

const { Reflectable, World, Entity } = Bevy;
export { Reflectable, World, Entity };

export class ReflectableObject extends Reflectable {
  constructor(type, generics, defaults, struct) {
    super(type, generics);
    this.struct = Object.seal(Object.assign({}, defaults, struct));
  }

  reflectUntyped() {
    const reflected = {};
    for (let property in this.struct) {
      const element = this.struct[property];
      if (element instanceof Reflectable) {
        reflected[property] = element.reflectUntyped();
      } else {
        reflected[property] = element;
      }
    }
    return reflected;
  }
}

export class ReflectableArray extends Reflectable {
  constructor(type, generics, defaults, seq) {
    super(type, generics);
    if (defaults) {
      if (!(seq instanceof Array)) {
        seq = [seq];
      }
      this.tuple_struct = Object.seal(Object.assign([], defaults, seq));
    }
  }

  reflectUntyped() {
    const len = this.tuple_struct.length;
    if (len === 0) {
      return null;
    } else if (len === 1) {
      const element = this.tuple_struct[0];
      if (element instanceof Reflectable) {
        return element.reflectUntyped();
      } else {
        return element;
      }
    } else {
      const reflected = [];
      for (let i = 0; i < len; i++) {
        const element = this.tuple_struct[i];
        if (element instanceof Reflectable) {
          reflected[i] = element.reflectUntyped();
        } else {
          reflected[i] = element;
        }
      }
      return reflected;
    }
  }
}

export class ReflectableEnum extends Reflectable {
  // TODO: defaults for ReflectableEnum
  constructor(type, generics, value) {
    super(type, generics);
    this.value = value;
  }

  reflectUntyped() {
    const type = this.type;
    const value = this.value;

    const reflected = {};
    if (value === undefined) {
      reflected[type] = null;
    } else if (value instanceof ReflectableEnumEntry) {
      reflected[value.type] = value.reflectUntyped();
    } else {
      reflected[type] = value;
    }
    return reflected;
  }
}
