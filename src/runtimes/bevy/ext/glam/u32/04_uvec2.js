"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class UVec2 extends ReflectableObject {
    static typeName = "glam::u32::uvec2::UVec2";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super({ x: 0, y: 0 }, struct);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("u32")) {
    window.glam.u32 = {};
  }
  if (!window.glam.u32.hasOwnProperty("uvec2")) {
    window.glam.u32.uvec2 = {};
  }

  Object.assign(window.glam.u32.uvec2, { UVec2 });
})(globalThis);
