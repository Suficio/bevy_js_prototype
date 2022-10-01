"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class AnimationPlayer extends ReflectableObject {
    static typeName = "bevy_animation::AnimationPlayer";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AnimationPlayer.prototype)
    ))();

  if (!window.hasOwnProperty("bevyAnimation")) {
    window.bevyAnimation = {};
  }
  Object.assign(window.bevyAnimation, { AnimationPlayer });
})(globalThis);
