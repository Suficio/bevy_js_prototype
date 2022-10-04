"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Vec2 extends ReflectableObject {
    static typeName = "glam::f32::vec2::Vec2";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super({ x: 0.0, y: 0.0 }, struct);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f32")) {
    window.glam.f32 = {};
  }
  if (!window.glam.f32.hasOwnProperty("vec2")) {
    window.glam.f32.vec2 = {};
  }

  Object.assign(window.glam.f32.vec2, { Vec2 });
})(globalThis);
