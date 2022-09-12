"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class AnimationPlayer extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_animation::AnimationPlayer";
    }
  }
  if (!window.hasOwnProperty("bevyAnimation")) {
    window.bevyAnimation = {};
  }
  Object.assign(window.bevyAnimation, { AnimationPlayer });
})(globalThis);
