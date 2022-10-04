"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class SkinnedMesh extends ReflectableObject {
    static typeName = "bevy_render::mesh::mesh::skinning::SkinnedMesh";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("render")) {
    window.Bevy.render = {};
  }
  if (!window.Bevy.render.hasOwnProperty("mesh")) {
    window.Bevy.render.mesh = {};
  }
  if (!window.Bevy.render.mesh.hasOwnProperty("mesh")) {
    window.Bevy.render.mesh.mesh = {};
  }
  if (!window.Bevy.render.mesh.mesh.hasOwnProperty("skinning")) {
    window.Bevy.render.mesh.mesh.skinning = {};
  }
  Object.assign(window.Bevy.render.mesh.mesh.skinning, { SkinnedMesh });
})(globalThis);
