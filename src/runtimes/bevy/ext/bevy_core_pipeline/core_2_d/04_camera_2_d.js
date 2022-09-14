"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class Camera2d extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_core_pipeline::core_2d::camera_2d::Camera2d";
    }
  }
  if (!window.hasOwnProperty("bevyCorePipeline")) {
    window.bevyCorePipeline = {};
  }
  if (!window.bevyCorePipeline.hasOwnProperty("core2D")) {
    window.bevyCorePipeline.core2D = {};
  }
  if (!window.bevyCorePipeline.core2D.hasOwnProperty("camera2D")) {
    window.bevyCorePipeline.core2D.camera2D = {};
  }
  Object.assign(window.bevyCorePipeline.core2D.camera2D, { Camera2d });
})(globalThis);
