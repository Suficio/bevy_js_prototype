"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class Name extends ReflectableObject {
    constructor(struct) {
      super({ hash: 13963134382976710451, name: "" }, struct);
    }
    typeName() {
      return "bevy_core::name::Name";
    }
  }
  if (!window.hasOwnProperty("bevyCore")) {
    window.bevyCore = {};
  }
  if (!window.bevyCore.hasOwnProperty("name")) {
    window.bevyCore.name = {};
  }
  Object.assign(window.bevyCore.name, { Name });
})(globalThis);
