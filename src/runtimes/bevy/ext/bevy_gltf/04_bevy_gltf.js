"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class GltfExtras extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_gltf::GltfExtras";
    }
  }
  if (!window.hasOwnProperty("bevyGltf")) {
    window.bevyGltf = {};
  }
  Object.assign(window.bevyGltf, { GltfExtras });
})(globalThis);
