"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Mesh2dHandle extends ReflectableArray {
    static typeName = "bevy_sprite::mesh2d::mesh::Mesh2dHandle";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(seq) {
      super(null, seq);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("sprite")) {
    window.Bevy.sprite = {};
  }
  if (!window.Bevy.sprite.hasOwnProperty("mesh2D")) {
    window.Bevy.sprite.mesh2D = {};
  }
  if (!window.Bevy.sprite.mesh2D.hasOwnProperty("mesh")) {
    window.Bevy.sprite.mesh2D.mesh = {};
  }
  Object.assign(window.Bevy.sprite.mesh2D.mesh, { Mesh2dHandle });
})(globalThis);
