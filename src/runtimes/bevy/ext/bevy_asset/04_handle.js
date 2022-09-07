"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class Handle extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_asset::handle::Handle";
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
