"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class SkinnedMesh extends ReflectableObject {
    static typeName = "bevy_render::mesh::mesh::skinning::SkinnedMesh";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), SkinnedMesh.prototype)
    ))();

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
