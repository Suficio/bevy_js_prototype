"use strict";
((window) => {
  const {
    Reflect,
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    waitForWorld,
    worldResourceId,
  } = window.bevyEcs;
  class Camera3d extends ReflectableObject {
    static typeName = "bevy_core_pipeline::core_3d::camera_3d::Camera3d";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Camera3d.prototype)
    ))();

  class Camera3dDepthLoadOpLoad extends ReflectableUnit {
    static typeName =
      "bevy_core_pipeline::core_3d::camera_3d::Camera3dDepthLoadOp";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Load");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Camera3dDepthLoadOp.prototype)
    ))();
  class Camera3dDepthLoadOp extends ReflectableEnum {
    static Clear = (value) => new Camera3dDepthLoadOp("Clear", value);
    static Load = () => new Camera3dDepthLoadOpLoad();
    static typeName =
      "bevy_core_pipeline::core_3d::camera_3d::Camera3dDepthLoadOp";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Camera3dDepthLoadOp.prototype)
    ))();

  if (!window.hasOwnProperty("bevyCorePipeline")) {
    window.bevyCorePipeline = {};
  }
  if (!window.bevyCorePipeline.hasOwnProperty("core3D")) {
    window.bevyCorePipeline.core3D = {};
  }
  if (!window.bevyCorePipeline.core3D.hasOwnProperty("camera3D")) {
    window.bevyCorePipeline.core3D.camera3D = {};
  }
  Object.assign(window.bevyCorePipeline.core3D.camera3D, {
    Camera3d,
    Camera3dDepthLoadOp,
  });
})(globalThis);
