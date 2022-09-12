"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  const { Vec3 } = window.glam.f32.vec3;
  class Mat3 extends ReflectableObject {
    constructor(struct) {
      super(
        {
          x_axis: new Vec3({ x: 1.0, y: 0.0, z: 0.0 }),
          y_axis: new Vec3({ x: 0.0, y: 1.0, z: 0.0 }),
          z_axis: new Vec3({ x: 0.0, y: 0.0, z: 1.0 }),
        },
        struct
      );
    }
    typeName() {
      return "glam::f32::mat3::Mat3";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f32")) {
    window.glam.f32 = {};
  }
  if (!window.glam.f32.hasOwnProperty("mat3")) {
    window.glam.f32.mat3 = {};
  }
  Object.assign(window.glam.f32.mat3, { Mat3 });
})(globalThis);
