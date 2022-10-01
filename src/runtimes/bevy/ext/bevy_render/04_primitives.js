"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Aabb extends ReflectableObject {
    static typeName = "bevy_render::primitives::Aabb";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Aabb.prototype)
    ))();

  class CubemapFrusta extends ReflectableObject {
    static typeName = "bevy_render::primitives::CubemapFrusta";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), CubemapFrusta.prototype)
    ))();

  class Frustum extends ReflectableObject {
    static typeName = "bevy_render::primitives::Frustum";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Frustum.prototype)
    ))();

  if (!window.hasOwnProperty("bevyRender")) {
    window.bevyRender = {};
  }
  if (!window.bevyRender.hasOwnProperty("primitives")) {
    window.bevyRender.primitives = {};
  }
  Object.assign(window.bevyRender.primitives, { Aabb, CubemapFrusta, Frustum });
})(globalThis);
