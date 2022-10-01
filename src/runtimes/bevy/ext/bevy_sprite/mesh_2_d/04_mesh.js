"use strict";
((window) => {
  const { Reflect, ReflectableArray, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Mesh2dHandle extends ReflectableArray {
    static typeName = "bevy_sprite::mesh2d::mesh::Mesh2dHandle";
    static typeId = new Uint8Array(8);
    constructor(seq) {
      super(null, seq);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Mesh2dHandle.prototype)
    ))();

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
