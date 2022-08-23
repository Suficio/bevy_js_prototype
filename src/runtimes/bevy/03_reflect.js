"use strict";

((window) => {
  class Reflectable {
    constructor(type, generics) {
      this.type = type;

      if (generics) {
        if (generics instanceof Array) {
          generics = generics.join(",");
        }
        this.type = `${type}<${generics}>`;
      }
    }

    reflect() {
      let obj = {};
      obj[type] = this.reflectUntyped();
      return obj;
    }

    reflectUntyped() {
      throw new Error("Reflectable must implement reflectUntyped");
    }
  }

  window.Bevy = Object.assign({ Reflectable }, window.Bevy);
})(globalThis);
