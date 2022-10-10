"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.Bevy.ecs;
  const { Affine3A } = window.glam.f32.affine3A;

  class GlobalTransform extends ReflectableArray {
    static typeName =
      "bevy_transform::components::global_transform::GlobalTransform";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(seq) {
      super([Affine3A.Identity()], seq);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("transform")) {
    window.Bevy.transform = {};
  }
  if (!window.Bevy.transform.hasOwnProperty("components")) {
    window.Bevy.transform.components = {};
  }
  if (!window.Bevy.transform.components.hasOwnProperty("globalTransform")) {
    window.Bevy.transform.components.globalTransform = {};
  }

  Object.assign(window.Bevy.transform.components.globalTransform, {
    GlobalTransform,
  });
})(globalThis);
