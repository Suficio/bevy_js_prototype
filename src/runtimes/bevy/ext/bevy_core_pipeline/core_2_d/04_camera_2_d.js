"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Camera2d extends ReflectableObject {
    static typeName = "bevy_core_pipeline::core_2d::camera_2d::Camera2d";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Camera2d.prototype)
    ))();

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
