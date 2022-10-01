"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class CubemapVisibleEntities extends ReflectableObject {
    static typeName = "bevy_pbr::bundle::CubemapVisibleEntities";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), CubemapVisibleEntities.prototype)
    ))();

  if (!window.hasOwnProperty("bevyPbr")) {
    window.bevyPbr = {};
  }
  if (!window.bevyPbr.hasOwnProperty("bundle")) {
    window.bevyPbr.bundle = {};
  }
  Object.assign(window.bevyPbr.bundle, { CubemapVisibleEntities });
})(globalThis);
