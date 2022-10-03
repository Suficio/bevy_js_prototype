"use strict";
((window) => {
  const { ReflectableArray, ReflectableObject, TypeRegistry, worldResourceId } =
    window.bevyEcs;
  const { UVec2 } = window.glam.u32.uvec2;

  class Camera extends ReflectableObject {
    static typeName = "bevy_render::camera::camera::Camera";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  class CameraRenderGraph extends ReflectableArray {
    static typeName = "bevy_render::camera::camera::CameraRenderGraph";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(seq) {
      super(null, seq);
    }
  }

  class Viewport extends ReflectableObject {
    static typeName = "bevy_render::camera::camera::Viewport";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(
        {
          physical_position: new UVec2({ x: 0, y: 0 }),
          physical_size: new UVec2({ x: 0, y: 0 }),
          depth: null,
        },
        struct
      );
    }
  }

  if (!window.hasOwnProperty("bevyRender")) {
    window.bevyRender = {};
  }
  if (!window.bevyRender.hasOwnProperty("camera")) {
    window.bevyRender.camera = {};
  }
  if (!window.bevyRender.camera.hasOwnProperty("camera")) {
    window.bevyRender.camera.camera = {};
  }
  Object.assign(window.bevyRender.camera.camera, {
    Camera,
    CameraRenderGraph,
    Viewport,
  });
})(globalThis);
