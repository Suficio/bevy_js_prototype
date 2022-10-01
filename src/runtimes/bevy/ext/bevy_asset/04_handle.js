"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Handle extends ReflectableObject {
    static typeName = "bevy_asset::handle::Handle";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Handle.prototype)
    ))();

  if (!window.hasOwnProperty("bevyAsset")) {
    window.bevyAsset = {};
  }
  if (!window.bevyAsset.hasOwnProperty("handle")) {
    window.bevyAsset.handle = {};
  }
  Object.assign(window.bevyAsset.handle, { Handle });
})(globalThis);
