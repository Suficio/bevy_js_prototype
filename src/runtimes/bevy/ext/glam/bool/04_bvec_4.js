"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class BVec4 extends ReflectableObject {
    static typeName = "glam::bool::bvec4::BVec4";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: false, y: false, z: false, w: false }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), BVec4.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("bool")) {
    window.glam.bool = {};
  }
  if (!window.glam.bool.hasOwnProperty("bvec4")) {
    window.glam.bool.bvec4 = {};
  }
  Object.assign(window.glam.bool.bvec4, { BVec4 });
})(globalThis);
