"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class BVec2 extends ReflectableObject {
    static typeName = "glam::bool::bvec2::BVec2";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super({ x: false, y: false }, struct);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("bool")) {
    window.glam.bool = {};
  }
  if (!window.glam.bool.hasOwnProperty("bvec2")) {
    window.glam.bool.bvec2 = {};
  }

  Object.assign(window.glam.bool.bvec2, { BVec2 });
})(globalThis);
