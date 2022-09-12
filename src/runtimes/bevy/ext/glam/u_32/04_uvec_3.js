"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class UVec3 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0, y: 0, z: 0 }, struct);
    }
    typeName() {
      return "glam::u32::uvec3::UVec3";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("u32")) {
    window.glam.u32 = {};
  }
  if (!window.glam.u32.hasOwnProperty("uvec3")) {
    window.glam.u32.uvec3 = {};
  }
  Object.assign(window.glam.u32.uvec3, { UVec3 });
})(globalThis);
