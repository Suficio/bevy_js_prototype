"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;
  class BVec3 extends ReflectableObject {
    static typeName = "glam::bool::bvec3::BVec3";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super({ x: false, y: false, z: false }, struct);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("bool")) {
    window.glam.bool = {};
  }
  if (!window.glam.bool.hasOwnProperty("bvec3")) {
    window.glam.bool.bvec3 = {};
  }
  Object.assign(window.glam.bool.bvec3, { BVec3 });
})(globalThis);
