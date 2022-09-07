"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class CubemapVisibleEntities extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
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
