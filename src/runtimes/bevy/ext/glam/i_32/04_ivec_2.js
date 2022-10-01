"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class IVec2 extends ReflectableObject {
    static typeName = "glam::i32::ivec2::IVec2";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: 0, y: 0 }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), IVec2.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("i32")) {
    window.glam.i32 = {};
  }
  if (!window.glam.i32.hasOwnProperty("ivec2")) {
    window.glam.i32.ivec2 = {};
  }
  Object.assign(window.glam.i32.ivec2, { IVec2 });
})(globalThis);
