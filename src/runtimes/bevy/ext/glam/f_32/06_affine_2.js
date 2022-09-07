"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  const { Mat2 } = window.glam.f32.sse2.mat2;
  const { Vec2 } = window.glam.f32.vec2;
  class Affine2 extends ReflectableObject {
    constructor(struct) {
      super(
        {
          matrix2: new Mat2({
            x_axis: new Vec2({ x: 1.0, y: 0.0 }),
            y_axis: new Vec2({ x: 0.0, y: 1.0 }),
          }),
          translation: new Vec2({ x: 0.0, y: 0.0 }),
        },
        struct
      );
    }
    typeName() {
      return "glam::f32::affine2::Affine2";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f32")) {
    window.glam.f32 = {};
  }
  if (!window.glam.f32.hasOwnProperty("affine2")) {
    window.glam.f32.affine2 = {};
  }
  Object.assign(window.glam.f32.affine2, { Affine2 });
})(globalThis);
