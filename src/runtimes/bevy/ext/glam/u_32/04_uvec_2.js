"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class UVec2 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0, y: 0 }, struct);
    }
    static typeName() {
      return "glam::u32::uvec2::UVec2";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("u32")) {
    window.glam.u32 = {};
  }
  if (!window.glam.u32.hasOwnProperty("uvec2")) {
    window.glam.u32.uvec2 = {};
  }
  Object.assign(window.glam.u32.uvec2, { UVec2 });
})(globalThis);
