"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;

  class Handle extends ReflectableObject {
    static typeName = "bevy_asset::handle::Handle";

    constructor(struct) {
      super(null, struct);
    }
  }

  if (!window.hasOwnProperty("bevyAsset")) {
    window.bevyAsset = {};
  }
  if (!window.bevyAsset.hasOwnProperty("handle")) {
    window.bevyAsset.handle = {};
  }
  Object.assign(window.bevyAsset.handle, { Handle });
})(globalThis);
