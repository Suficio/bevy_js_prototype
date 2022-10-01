"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Name extends ReflectableObject {
    static typeName = "bevy_core::name::Name";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ hash: 15558144093043052575, name: "" }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Name.prototype)
    ))();

  if (!window.hasOwnProperty("bevyCore")) {
    window.bevyCore = {};
  }
  if (!window.bevyCore.hasOwnProperty("name")) {
    window.bevyCore.name = {};
  }
  Object.assign(window.bevyCore.name, { Name });
})(globalThis);
