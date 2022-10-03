"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;

  class AnimationPlayer extends ReflectableObject {
    static typeName = "bevy_animation::AnimationPlayer";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  if (!window.hasOwnProperty("bevyAnimation")) {
    window.bevyAnimation = {};
  }
  Object.assign(window.bevyAnimation, { AnimationPlayer });
})(globalThis);
