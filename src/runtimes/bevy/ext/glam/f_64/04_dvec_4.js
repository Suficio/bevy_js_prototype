"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class DVec4 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0.0, y: 0.0, z: 0.0, w: 0.0 }, struct);
    }
    typeName() {
      return "glam::f64::dvec4::DVec4";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f64")) {
    window.glam.f64 = {};
  }
  if (!window.glam.f64.hasOwnProperty("dvec4")) {
    window.glam.f64.dvec4 = {};
  }
  Object.assign(window.glam.f64.dvec4, { DVec4 });
})(globalThis);
