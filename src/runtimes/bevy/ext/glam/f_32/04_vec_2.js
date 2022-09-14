"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class Vec2 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0.0, y: 0.0 }, struct);
    }
    static typeName() {
      return "glam::f32::vec2::Vec2";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f32")) {
    window.glam.f32 = {};
  }
  if (!window.glam.f32.hasOwnProperty("vec2")) {
    window.glam.f32.vec2 = {};
  }
  Object.assign(window.glam.f32.vec2, { Vec2 });
})(globalThis);
