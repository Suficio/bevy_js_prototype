"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class DVec2 extends ReflectableObject {
    static typeName = "glam::f64::dvec2::DVec2";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: 0.0, y: 0.0 }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), DVec2.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f64")) {
    window.glam.f64 = {};
  }
  if (!window.glam.f64.hasOwnProperty("dvec2")) {
    window.glam.f64.dvec2 = {};
  }
  Object.assign(window.glam.f64.dvec2, { DVec2 });
})(globalThis);
