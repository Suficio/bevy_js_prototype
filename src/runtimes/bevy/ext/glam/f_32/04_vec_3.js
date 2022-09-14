"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class Vec3 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0.0, y: 0.0, z: 0.0 }, struct);
    }
    static typeName() {
      return "glam::f32::vec3::Vec3";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f32")) {
    window.glam.f32 = {};
  }
  if (!window.glam.f32.hasOwnProperty("vec3")) {
    window.glam.f32.vec3 = {};
  }
  Object.assign(window.glam.f32.vec3, { Vec3 });
})(globalThis);
