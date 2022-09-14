"use strict";
((window) => {
  const { ReflectableEnum, ReflectableObject, ReflectableUnit } =
    window.bevyEcs;
  class Camera3d extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_core_pipeline::core_3d::camera_3d::Camera3d";
    }
  }
  class Camera3dDepthLoadOpLoad extends ReflectableUnit {
    constructor() {
      super("Load");
    }
    static typeName() {
      return "bevy_core_pipeline::core_3d::camera_3d::Camera3dDepthLoadOp";
    }
  }
  class Camera3dDepthLoadOp extends ReflectableEnum {
    static Clear = (value) => new Camera3dDepthLoadOp("Clear", value);
    static Load = () => new Camera3dDepthLoadOpLoad();
    constructor(type, value) {
      super(type, value);
    }
    static typeName() {
      return "bevy_core_pipeline::core_3d::camera_3d::Camera3dDepthLoadOp";
    }
  }
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
