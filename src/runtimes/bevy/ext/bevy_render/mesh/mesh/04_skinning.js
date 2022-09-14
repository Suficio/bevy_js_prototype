"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class SkinnedMesh extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_render::mesh::mesh::skinning::SkinnedMesh";
    }
  }
  if (!window.hasOwnProperty("bevyRender")) {
    window.bevyRender = {};
  }
  if (!window.bevyRender.hasOwnProperty("mesh")) {
    window.bevyRender.mesh = {};
  }
  if (!window.bevyRender.mesh.hasOwnProperty("mesh")) {
    window.bevyRender.mesh.mesh = {};
  }
  if (!window.bevyRender.mesh.mesh.hasOwnProperty("skinning")) {
    window.bevyRender.mesh.mesh.skinning = {};
  }
  Object.assign(window.bevyRender.mesh.mesh.skinning, { SkinnedMesh });
})(globalThis);
