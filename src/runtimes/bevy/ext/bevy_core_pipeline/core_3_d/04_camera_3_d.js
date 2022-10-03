"use strict";
((window) => {
  const {
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    TypeRegistry,
    worldResourceId,
  } = window.bevyEcs;
  class Camera3d extends ReflectableObject {
    static typeName = "bevy_core_pipeline::core_3d::camera_3d::Camera3d";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super(null, struct);
    }
  }

  class Camera3dDepthLoadOpLoad extends ReflectableUnit {
    static typeName =
      "bevy_core_pipeline::core_3d::camera_3d::Camera3dDepthLoadOp";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("Load");
    }
  }
  class Camera3dDepthLoadOp extends ReflectableEnum {
    static Clear = (value) => new Camera3dDepthLoadOp("Clear", value);
    static Load = () => new Camera3dDepthLoadOpLoad();
    static typeName =
      "bevy_core_pipeline::core_3d::camera_3d::Camera3dDepthLoadOp";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(type, value) {
      super(type, value);
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
