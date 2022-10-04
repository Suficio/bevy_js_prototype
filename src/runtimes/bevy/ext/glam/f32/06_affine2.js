"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;
  const { Mat2 } = window.glam.f32.sse2.mat2;
  const { Vec2 } = window.glam.f32.vec2;

  class Affine2 extends ReflectableObject {
    static typeName = "glam::f32::affine2::Affine2";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

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
