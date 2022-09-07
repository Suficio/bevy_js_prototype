"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class BVec3 extends ReflectableObject {
    constructor(struct) {
      super({ x: false, y: false, z: false }, struct);
    }
    typeName() {
      return "glam::bool::bvec3::BVec3";
    }
  }
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
