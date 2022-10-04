"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class UVec3 extends ReflectableObject {
    static typeName = "glam::u32::uvec3::UVec3";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super({ x: 0, y: 0, z: 0 }, struct);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("u32")) {
    window.glam.u32 = {};
  }
  if (!window.glam.u32.hasOwnProperty("uvec3")) {
    window.glam.u32.uvec3 = {};
  }
  Object.assign(window.glam.u32.uvec3, { UVec3 });
})(globalThis);
