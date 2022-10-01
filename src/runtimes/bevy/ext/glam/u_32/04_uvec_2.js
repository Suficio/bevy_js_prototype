"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class UVec2 extends ReflectableObject {
    static typeName = "glam::u32::uvec2::UVec2";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: 0, y: 0 }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), UVec2.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("u32")) {
    window.glam.u32 = {};
  }
  if (!window.glam.u32.hasOwnProperty("uvec2")) {
    window.glam.u32.uvec2 = {};
  }
  Object.assign(window.glam.u32.uvec2, { UVec2 });
})(globalThis);
