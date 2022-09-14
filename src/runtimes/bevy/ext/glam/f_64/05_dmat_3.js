"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  const { DVec3 } = window.glam.f64.dvec3;
  class DMat3 extends ReflectableObject {
    constructor(struct) {
      super(
        {
          x_axis: new DVec3({ x: 1.0, y: 0.0, z: 0.0 }),
          y_axis: new DVec3({ x: 0.0, y: 1.0, z: 0.0 }),
          z_axis: new DVec3({ x: 0.0, y: 0.0, z: 1.0 }),
        },
        struct
      );
    }
    static typeName() {
      return "glam::f64::dmat3::DMat3";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f64")) {
    window.glam.f64 = {};
  }
  if (!window.glam.f64.hasOwnProperty("dmat3")) {
    window.glam.f64.dmat3 = {};
  }
  Object.assign(window.glam.f64.dmat3, { DMat3 });
})(globalThis);
