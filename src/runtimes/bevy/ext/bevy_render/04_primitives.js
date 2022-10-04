"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Aabb extends ReflectableObject {
    static typeName = "bevy_render::primitives::Aabb";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  class CubemapFrusta extends ReflectableObject {
    static typeName = "bevy_render::primitives::CubemapFrusta";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  class Frustum extends ReflectableObject {
    static typeName = "bevy_render::primitives::Frustum";
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
  if (!window.Bevy.render.hasOwnProperty("primitives")) {
    window.Bevy.render.primitives = {};
  }
  Object.assign(window.Bevy.render.primitives, {
    Aabb,
    CubemapFrusta,
    Frustum,
  });
})(globalThis);
