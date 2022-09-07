"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class Vec4 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0.0, y: 0.0, z: 0.0, w: 0.0 }, struct);
    }
    typeName() {
      return "glam::f32::sse2::vec4::Vec4";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f32")) {
    window.glam.f32 = {};
  }
  if (!window.glam.f32.hasOwnProperty("sse2")) {
    window.glam.f32.sse2 = {};
  }
  if (!window.glam.f32.sse2.hasOwnProperty("vec4")) {
    window.glam.f32.sse2.vec4 = {};
  }
  Object.assign(window.glam.f32.sse2.vec4, { Vec4 });
})(globalThis);
