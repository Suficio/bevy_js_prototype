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

    if (seq && !(seq instanceof Array)) {
      seq = [seq];
    }

    this.array = Object.seal(Object.assign([], defaults, seq));
  }

  reflectUntyped() {
    if (!this.array || this.array.length === 0) {
      return null;
    } else {
      const reflected = [];
      for (let i = 0; i < this.array.length; i++) {
        const element = this.array[i];
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
    const value = this.value;

    if (value === undefined) {
      return null;
    } else if (value instanceof ReflectableArray) {
      const seq = value.reflectUntyped();
      if (!seq || seq.length === 0) {
        return null;
      }

      const reflected = {};
      if (seq.length === 1) {
        reflected[value.type] = seq[0];
      } else {
        reflected[value.type] = seq;
      }
      return reflected;
    } else if (value instanceof Reflectable) {
      const untyped = value.reflectUntyped();
      if (untyped) {
        return untyped;
      } else {
        return null;
      }
    } else {
      return value;
    }
  }
}
