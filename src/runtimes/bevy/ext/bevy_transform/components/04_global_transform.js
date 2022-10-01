"use strict";
((window) => {
  const { Reflect, ReflectableArray, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class GlobalTransform extends ReflectableArray {
    static typeName =
      "bevy_transform::components::global_transform::GlobalTransform";
    static typeId = new Uint8Array(8);
    constructor(seq) {
      super([Affine3A.Identity()], seq);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), GlobalTransform.prototype)
    ))();

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
