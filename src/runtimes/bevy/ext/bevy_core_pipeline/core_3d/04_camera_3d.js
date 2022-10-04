"use strict";
((window) => {
  const {
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    TypeRegistry,
    worldResourceId,
  } = window.Bevy.ecs;

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

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("pipeline")) {
    window.Bevy.pipeline = {};
  }
  if (!window.Bevy.pipeline.hasOwnProperty("core3D")) {
    window.Bevy.pipeline.core3D = {};
  }
  if (!window.Bevy.pipeline.core3D.hasOwnProperty("camera3D")) {
    window.Bevy.pipeline.core3D.camera3D = {};
  }
  Object.assign(window.Bevy.pipeline.core3D.camera3D, {
    Camera3d,
    Camera3dDepthLoadOp,
  });
})(globalThis);
