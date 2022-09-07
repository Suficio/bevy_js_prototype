"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class IVec3 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0, y: 0, z: 0 }, struct);
    }
    typeName() {
      return "glam::i32::ivec3::IVec3";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("i32")) {
    window.glam.i32 = {};
  }
  if (!window.glam.i32.hasOwnProperty("ivec3")) {
    window.glam.i32.ivec3 = {};
  }
  Object.assign(window.glam.i32.ivec3, { IVec3 });
})(globalThis);
