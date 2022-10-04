"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

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

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("animation")) {
    window.Bevy.animation = {};
  }

  Object.assign(window.Bevy.animation, { AnimationPlayer });
})(globalThis);
