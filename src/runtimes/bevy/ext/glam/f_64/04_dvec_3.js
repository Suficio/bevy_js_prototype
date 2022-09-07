"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class DVec3 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0.0, y: 0.0, z: 0.0 }, struct);
    }
    typeName() {
      return "glam::f64::dvec3::DVec3";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f64")) {
    window.glam.f64 = {};
  }
  if (!window.glam.f64.hasOwnProperty("dvec3")) {
    window.glam.f64.dvec3 = {};
  }
  Object.assign(window.glam.f64.dvec3, { DVec3 });
})(globalThis);
