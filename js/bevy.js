"use strict";

const { Reflectable, World, Entity } = Bevy;
export { Reflectable, World, Entity };

// Simplified case of Reflectable that handles array-like objects with single
// fields
export class ReflectableValue extends Reflectable {
  constructor(type, defaults, value) {
    super(type, null);
    if (value) {
      this.value = Object.seal(value);
    } else {
      this.value = Object.seal(defaults);
    }
  }

  reflectUntyped() {
    if (this.value instanceof Reflectable) {
      return this.value.reflectUntyped();
    } else {
      return this.value;
    }
  }
}

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

export class ReflectableEnum extends Reflectable {
  // TODO: defaults for ReflectableEnum
  constructor(type, generics, value) {
    super(type, generics);
    this.value = value;
  }

  reflectUntyped() {
    const value = this.value;
    if (value instanceof Reflectable) {
      return value.reflect();
    } else {
      return value;
    }
  }
}
