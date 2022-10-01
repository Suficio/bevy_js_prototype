"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class DVec3 extends ReflectableObject {
    static typeName = "glam::f64::dvec3::DVec3";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: 0.0, y: 0.0, z: 0.0 }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), DVec3.prototype)
    ))();

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
