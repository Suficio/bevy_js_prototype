"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class GltfExtras extends ReflectableObject {
    static typeName = "bevy_gltf::GltfExtras";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), GltfExtras.prototype)
    ))();

  if (!window.hasOwnProperty("bevyGltf")) {
    window.bevyGltf = {};
  }
  Object.assign(window.bevyGltf, { GltfExtras });
})(globalThis);
