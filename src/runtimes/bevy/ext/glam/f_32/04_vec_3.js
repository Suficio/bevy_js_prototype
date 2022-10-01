"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Vec3 extends ReflectableObject {
    static typeName = "glam::f32::vec3::Vec3";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ x: 0.0, y: 0.0, z: 0.0 }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Vec3.prototype)
    ))();

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f32")) {
    window.glam.f32 = {};
  }
  if (!window.glam.f32.hasOwnProperty("vec3")) {
    window.glam.f32.vec3 = {};
  }
  Object.assign(window.glam.f32.vec3, { Vec3 });
})(globalThis);
