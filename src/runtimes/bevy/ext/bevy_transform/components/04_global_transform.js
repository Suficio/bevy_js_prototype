"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.bevyEcs;
  const { Affine3A } = window.glam.f32.affine3A;
  class GlobalTransform extends ReflectableArray {
    static typeName =
      "bevy_transform::components::global_transform::GlobalTransform";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(seq) {
      super([Affine3A.Identity()], seq);
    }
  }

  if (!window.hasOwnProperty("bevyTransform")) {
    window.bevyTransform = {};
  }
  if (!window.bevyTransform.hasOwnProperty("components")) {
    window.bevyTransform.components = {};
  }
  if (!window.bevyTransform.components.hasOwnProperty("globalTransform")) {
    window.bevyTransform.components.globalTransform = {};
  }
  Object.assign(window.bevyTransform.components.globalTransform, {
    GlobalTransform,
  });
})(globalThis);
