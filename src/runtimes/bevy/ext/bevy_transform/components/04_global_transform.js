"use strict";
((window) => {
  const { ReflectableArray } = window.bevyEcs;
  class GlobalTransform extends ReflectableArray {
    constructor(seq) {
      super(null, seq);
    }
    typeName() {
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
