"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class GltfExtras extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_gltf::GltfExtras";
    }
  }
  if (!window.hasOwnProperty("bevyGltf")) {
    window.bevyGltf = {};
  }
  Object.assign(window.bevyGltf, { GltfExtras });
})(globalThis);
