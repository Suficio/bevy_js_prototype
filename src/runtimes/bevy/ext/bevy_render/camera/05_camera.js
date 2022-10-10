"use strict";
((window) => {
  const { ReflectableArray, ReflectableObject, TypeRegistry, worldResourceId } =
    window.Bevy.ecs;
  const { UVec2 } = window.glam.u32.uvec2;

  class Camera extends ReflectableObject {
    static typeName = "bevy_render::camera::camera::Camera";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("render")) {
    window.Bevy.render = {};
  }
  if (!window.Bevy.render.hasOwnProperty("camera")) {
    window.Bevy.render.camera = {};
  }
  if (!window.Bevy.render.camera.hasOwnProperty("camera")) {
    window.Bevy.render.camera.camera = {};
  }

  Object.assign(window.Bevy.render.camera.camera, {
    Camera,
    CameraRenderGraph,
    Viewport,
  });
})(globalThis);
