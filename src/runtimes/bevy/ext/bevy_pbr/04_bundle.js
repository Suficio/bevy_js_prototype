"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;
  class CubemapVisibleEntities extends ReflectableObject {
    static typeName = "bevy_pbr::bundle::CubemapVisibleEntities";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super(null, struct);
    }
  }

  if (!window.hasOwnProperty("bevyPbr")) {
    window.bevyPbr = {};
  }
  if (!window.bevyPbr.hasOwnProperty("bundle")) {
    window.bevyPbr.bundle = {};
  }
  Object.assign(window.bevyPbr.bundle, { CubemapVisibleEntities });
})(globalThis);
