"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class Aabb extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_render::primitives::Aabb";
    }
  }
  class CubemapFrusta extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_render::primitives::CubemapFrusta";
    }
  }
  class Frustum extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_render::primitives::Frustum";
    }
  }
  if (!window.hasOwnProperty("bevyRender")) {
    window.bevyRender = {};
  }
  if (!window.bevyRender.hasOwnProperty("primitives")) {
    window.bevyRender.primitives = {};
  }
  Object.assign(window.bevyRender.primitives, { Aabb, CubemapFrusta, Frustum });
})(globalThis);
