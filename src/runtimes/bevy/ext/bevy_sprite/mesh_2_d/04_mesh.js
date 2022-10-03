"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.bevyEcs;
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

  if (!window.hasOwnProperty("bevySprite")) {
    window.bevySprite = {};
  }
  if (!window.bevySprite.hasOwnProperty("mesh2D")) {
    window.bevySprite.mesh2D = {};
  }
  if (!window.bevySprite.mesh2D.hasOwnProperty("mesh")) {
    window.bevySprite.mesh2D.mesh = {};
  }
  Object.assign(window.bevySprite.mesh2D.mesh, { Mesh2dHandle });
})(globalThis);
