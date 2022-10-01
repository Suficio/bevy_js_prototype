"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class IVec4 extends ReflectableObject {
    static typeName = "glam::i32::ivec4::IVec4";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: 0, y: 0, z: 0, w: 0 }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), IVec4.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("i32")) {
    window.glam.i32 = {};
  }
  if (!window.glam.i32.hasOwnProperty("ivec4")) {
    window.glam.i32.ivec4 = {};
  }
  Object.assign(window.glam.i32.ivec4, { IVec4 });
})(globalThis);
