"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class BVec4 extends ReflectableObject {
    constructor(struct) {
      super({ x: false, y: false, z: false, w: false }, struct);
    }
    typeName() {
      return "glam::bool::bvec4::BVec4";
    }
  }
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
