"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;
  class BVec4 extends ReflectableObject {
    static typeName = "glam::bool::bvec4::BVec4";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super({ x: false, y: false, z: false, w: false }, struct);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("bool")) {
    window.glam.bool = {};
  }
  if (!window.glam.bool.hasOwnProperty("bvec4")) {
    window.glam.bool.bvec4 = {};
  }
  Object.assign(window.glam.bool.bvec4, { BVec4 });
})(globalThis);
