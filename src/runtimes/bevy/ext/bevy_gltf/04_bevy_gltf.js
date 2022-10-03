"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;
  class GltfExtras extends ReflectableObject {
    static typeName = "bevy_gltf::GltfExtras";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super(null, struct);
    }
  }

  if (!window.hasOwnProperty("bevyGltf")) {
    window.bevyGltf = {};
  }
  Object.assign(window.bevyGltf, { GltfExtras });
})(globalThis);
