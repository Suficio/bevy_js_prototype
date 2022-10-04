"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Camera2d extends ReflectableObject {
    static typeName = "bevy_core_pipeline::core_2d::camera_2d::Camera2d";
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
  if (!window.Bevy.hasOwnProperty("pipeline")) {
    window.Bevy.pipeline = {};
  }
  if (!window.Bevy.pipeline.hasOwnProperty("core2D")) {
    window.Bevy.pipeline.core2D = {};
  }
  if (!window.Bevy.pipeline.core2D.hasOwnProperty("camera2D")) {
    window.Bevy.pipeline.core2D.camera2D = {};
  }

  Object.assign(window.Bevy.pipeline.core2D.camera2D, { Camera2d });
})(globalThis);
