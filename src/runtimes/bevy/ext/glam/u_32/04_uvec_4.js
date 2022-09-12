"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class UVec4 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0, y: 0, z: 0, w: 0 }, struct);
    }
    typeName() {
      return "glam::u32::uvec4::UVec4";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("u32")) {
    window.glam.u32 = {};
  }
  if (!window.glam.u32.hasOwnProperty("uvec4")) {
    window.glam.u32.uvec4 = {};
  }
  Object.assign(window.glam.u32.uvec4, { UVec4 });
})(globalThis);
