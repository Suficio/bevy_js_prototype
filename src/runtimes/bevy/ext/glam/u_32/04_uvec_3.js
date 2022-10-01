"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class UVec3 extends ReflectableObject {
    static typeName = "glam::u32::uvec3::UVec3";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: 0, y: 0, z: 0 }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), UVec3.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("u32")) {
    window.glam.u32 = {};
  }
  if (!window.glam.u32.hasOwnProperty("uvec3")) {
    window.glam.u32.uvec3 = {};
  }
  Object.assign(window.glam.u32.uvec3, { UVec3 });
})(globalThis);
