"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;
  const { Vec2 } = window.glam.f32.vec2;

  class Mat2 extends ReflectableObject {
    static typeName = "glam::f32::sse2::mat2::Mat2";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(
        {
          x_axis: new Vec2({ x: 1.0, y: 0.0 }),
          y_axis: new Vec2({ x: 0.0, y: 1.0 }),
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
  if (!window.glam.f32.hasOwnProperty("sse2")) {
    window.glam.f32.sse2 = {};
  }
  if (!window.glam.f32.sse2.hasOwnProperty("mat2")) {
    window.glam.f32.sse2.mat2 = {};
  }
  Object.assign(window.glam.f32.sse2.mat2, { Mat2 });
})(globalThis);
