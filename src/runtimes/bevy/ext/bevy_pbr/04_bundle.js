"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class CubemapVisibleEntities extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_pbr::bundle::CubemapVisibleEntities";
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
