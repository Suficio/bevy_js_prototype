"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class GltfExtras extends ReflectableObject {
    static typeName = "bevy_gltf::GltfExtras";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("gltf")) {
    window.Bevy.gltf = {};
  }

  Object.assign(window.Bevy.gltf, { GltfExtras });
})(globalThis);
