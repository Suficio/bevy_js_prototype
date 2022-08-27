"use strict";

import { ReflectableEnum, ReflectableArray } from "./../bevy.js";

export class OptionSome extends ReflectableArray {
  constructor(seq) {
    super("Some", null, null, seq);
  }
}

export class Option extends ReflectableEnum {
  static None = () => new Option("None");
  static Some = (...args) => new Option(new OptionSome(...args));
  constructor(value) {
    super("core::option::Option", null, value);
  }

  // Option has special serialization rules
  reflectUntyped() {
    if (this.value.type === "Some") {
      return this.value.reflectUntyped();
    } else {
      return undefined;
    }
  }
}
