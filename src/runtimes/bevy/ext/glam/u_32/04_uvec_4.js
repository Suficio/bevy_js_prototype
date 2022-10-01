"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class UVec4 extends ReflectableObject {
    static typeName = "glam::u32::uvec4::UVec4";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: 0, y: 0, z: 0, w: 0 }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), UVec4.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("u32")) {
    window.glam.u32 = {};
  }
  if (!window.glam.u32.hasOwnProperty("uvec4")) {
    window.glam.u32.uvec4 = {};
  }
  Object.assign(window.glam.u32.uvec4, { UVec4 });
})(globalThis);
