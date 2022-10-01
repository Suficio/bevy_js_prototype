"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class BVec3 extends ReflectableObject {
    static typeName = "glam::bool::bvec3::BVec3";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: false, y: false, z: false }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), BVec3.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("bool")) {
    window.glam.bool = {};
  }
  if (!window.glam.bool.hasOwnProperty("bvec3")) {
    window.glam.bool.bvec3 = {};
  }
  Object.assign(window.glam.bool.bvec3, { BVec3 });
})(globalThis);
