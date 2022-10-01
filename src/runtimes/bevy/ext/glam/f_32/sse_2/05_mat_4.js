"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  const { Vec4 } = window.glam.f32.sse2.vec4;
  class Mat4 extends ReflectableObject {
    static typeName = "glam::f32::sse2::mat4::Mat4";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(
        {
          x_axis: new Vec4({ x: 1.0, y: 0.0, z: 0.0, w: 0.0 }),
          y_axis: new Vec4({ x: 0.0, y: 1.0, z: 0.0, w: 0.0 }),
          z_axis: new Vec4({ x: 0.0, y: 0.0, z: 1.0, w: 0.0 }),
          w_axis: new Vec4({ x: 0.0, y: 0.0, z: 0.0, w: 1.0 }),
        },
        struct
      );
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Mat4.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f32")) {
    window.glam.f32 = {};
  }
  if (!window.glam.f32.hasOwnProperty("sse2")) {
    window.glam.f32.sse2 = {};
  }
  if (!window.glam.f32.sse2.hasOwnProperty("mat4")) {
    window.glam.f32.sse2.mat4 = {};
  }
  Object.assign(window.glam.f32.sse2.mat4, { Mat4 });
})(globalThis);
