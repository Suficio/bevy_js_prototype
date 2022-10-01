"use strict";
((window) => {
  const {
    Reflect,
    ReflectableArray,
    ReflectableObject,
    waitForWorld,
    worldResourceId,
  } = window.bevyEcs;
  const { UVec2 } = window.glam.u32.uvec2;
  class Camera extends ReflectableObject {
    static typeName = "bevy_render::camera::camera::Camera";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Camera.prototype)
    ))();

  class CameraRenderGraph extends ReflectableArray {
    static typeName = "bevy_render::camera::camera::CameraRenderGraph";
    static typeId = new Uint8Array(8);
    constructor(seq) {
      super(null, seq);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), CameraRenderGraph.prototype)
    ))();

  class Viewport extends ReflectableObject {
    static typeName = "bevy_render::camera::camera::Viewport";
    static typeId = new Uint8Array(8);
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
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Viewport.prototype)
    ))();

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
