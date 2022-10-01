"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  const { DVec4 } = window.glam.f64.dvec4;
  class DMat4 extends ReflectableObject {
    static typeName = "glam::f64::dmat4::DMat4";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(
        {
          x_axis: new DVec4({ x: 1.0, y: 0.0, z: 0.0, w: 0.0 }),
          y_axis: new DVec4({ x: 0.0, y: 1.0, z: 0.0, w: 0.0 }),
          z_axis: new DVec4({ x: 0.0, y: 0.0, z: 1.0, w: 0.0 }),
          w_axis: new DVec4({ x: 0.0, y: 0.0, z: 0.0, w: 1.0 }),
        },
        struct
      );
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), DMat4.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f64")) {
    window.glam.f64 = {};
  }
  if (!window.glam.f64.hasOwnProperty("dmat4")) {
    window.glam.f64.dmat4 = {};
  }
  Object.assign(window.glam.f64.dmat4, { DMat4 });
})(globalThis);
