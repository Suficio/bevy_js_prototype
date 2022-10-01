"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class BVec2 extends ReflectableObject {
    static typeName = "glam::bool::bvec2::BVec2";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: false, y: false }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), BVec2.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("bool")) {
    window.glam.bool = {};
  }
  if (!window.glam.bool.hasOwnProperty("bvec2")) {
    window.glam.bool.bvec2 = {};
  }
  Object.assign(window.glam.bool.bvec2, { BVec2 });
})(globalThis);
