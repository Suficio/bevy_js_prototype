"use strict";
((window) => {
  const { ReflectableArray } = window.bevyEcs;
  const { Affine3A } = window.glam.f32.affine3A;
  class GlobalTransform extends ReflectableArray {
    static Identity = () => new GlobalTransform(Affine3A.Identity());
    constructor(seq) {
      super([Affine3A.Identity()], seq);
      Deno.core.print(JSON.stringify(this));
    }
    static typeName() {
      return "bevy_transform::components::global_transform::GlobalTransform";
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
