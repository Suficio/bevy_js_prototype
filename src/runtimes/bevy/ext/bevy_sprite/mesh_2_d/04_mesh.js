"use strict";
((window) => {
  const { ReflectableArray } = window.bevyEcs.reflect;
  class Mesh2dHandle extends ReflectableArray {
    constructor(seq) {
      super(null, seq);
    }
    typeName() {
      return "bevy_sprite::mesh2d::mesh::Mesh2dHandle";
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
