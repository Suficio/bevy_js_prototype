"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Vec2 extends ReflectableObject {
    static typeName = "glam::f32::vec2::Vec2";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: 0.0, y: 0.0 }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Vec2.prototype)
    ))();

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
