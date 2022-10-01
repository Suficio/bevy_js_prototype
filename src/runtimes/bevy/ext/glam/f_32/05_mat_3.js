"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  const { Vec3 } = window.glam.f32.vec3;
  class Mat3 extends ReflectableObject {
    static typeName = "glam::f32::mat3::Mat3";
    static typeId = new Uint8Array(8);
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
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Mat3.prototype)
    ))();

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
