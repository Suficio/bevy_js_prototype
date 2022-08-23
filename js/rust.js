"use strict";

import { ReflectableEnum, ReflectableEnumEntry } from "./bevy";

export class OptionNone extends ReflectableEnumEntry {
  constructor() {
    super("None", []);
  }
}

export class OptionSome extends ReflectableEnumEntry {
  constructor(associated, seq) {
    super("Some", [associated], seq);
  }
}

export class Option extends ReflectableEnum {
  static None = (...args) => new Option(new OptionNone(...args));
  static Some = (...args) => new Option(new OptionSome(...args));

  constructor(value = new OptionNone()) {
    super("core::option::Option", value);
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
