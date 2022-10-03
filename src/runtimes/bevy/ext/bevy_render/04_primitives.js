"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;

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

  if (!window.hasOwnProperty("bevyRender")) {
    window.bevyRender = {};
  }
  if (!window.bevyRender.hasOwnProperty("primitives")) {
    window.bevyRender.primitives = {};
  }
  Object.assign(window.bevyRender.primitives, { Aabb, CubemapFrusta, Frustum });
})(globalThis);
