"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class IVec4 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0, y: 0, z: 0, w: 0 }, struct);
    }
    static typeName() {
      return "glam::i32::ivec4::IVec4";
    }
  }
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
