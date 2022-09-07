"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class BVec2 extends ReflectableObject {
    constructor(struct) {
      super({ x: false, y: false }, struct);
    }
    typeName() {
      return "glam::bool::bvec2::BVec2";
    }
  }
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
