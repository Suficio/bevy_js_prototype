"use strict";
((window) => {
  const { ReflectableArray, ReflectableObject } = window.bevyEcs;
  const { UVec2 } = window.glam.u32.uvec2;
  class Camera extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_render::camera::camera::Camera";
    }
  }
  class CameraRenderGraph extends ReflectableArray {
    constructor(seq) {
      super(null, seq);
    }
    typeName() {
      return "bevy_render::camera::camera::CameraRenderGraph";
    }
  }
  class Viewport extends ReflectableObject {
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
    typeName() {
      return "bevy_render::camera::camera::Viewport";
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
