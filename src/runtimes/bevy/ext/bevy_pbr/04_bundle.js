"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class CubemapVisibleEntities extends ReflectableObject {
    static typeName = "bevy_pbr::bundle::CubemapVisibleEntities";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("pbr")) {
    window.Bevy.pbr = {};
  }
  if (!window.Bevy.pbr.hasOwnProperty("bundle")) {
    window.Bevy.pbr.bundle = {};
  }

  Object.assign(window.Bevy.pbr.bundle, { CubemapVisibleEntities });
})(globalThis);
