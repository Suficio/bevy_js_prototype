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
  class OrthographicProjection extends ReflectableObject {
    static typeName = "bevy_render::camera::projection::OrthographicProjection";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(
        {
          left: -1.0,
          right: 1.0,
          bottom: -1.0,
          top: 1.0,
          near: 0.0,
          far: 1000.0,
          window_origin: WindowOrigin.Center(),
          scaling_mode: ScalingMode.WindowSize(),
          scale: 1.0,
        },
        struct
      );
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), OrthographicProjection.prototype)
    ))();

  class PerspectiveProjection extends ReflectableObject {
    static typeName = "bevy_render::camera::projection::PerspectiveProjection";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(
        { fov: 0.7853982, aspect_ratio: 1.0, near: 0.1, far: 1000.0 },
        struct
      );
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), PerspectiveProjection.prototype)
    ))();

  class Projection extends ReflectableEnum {
    static Perspective = (value) => new Projection("Perspective", value);
    static Orthographic = (value) => new Projection("Orthographic", value);
    static typeName = "bevy_render::camera::projection::Projection";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Projection.prototype)
    ))();

  class ScalingModeNone extends ReflectableUnit {
    static typeName = "bevy_render::camera::projection::ScalingMode";
    static typeId = new Uint8Array(8);
    constructor() {
      super("None");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ScalingMode.prototype)
    ))();
  class ScalingModeWindowSize extends ReflectableUnit {
    static typeName = "bevy_render::camera::projection::ScalingMode";
    static typeId = new Uint8Array(8);
    constructor() {
      super("WindowSize");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ScalingMode.prototype)
    ))();
  class ScalingModeAuto extends ReflectableObject {
    static typeName = "bevy_render::camera::projection::ScalingMode";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ScalingMode.prototype)
    ))();
  class ScalingMode extends ReflectableEnum {
    static None = () => new ScalingModeNone();
    static WindowSize = () => new ScalingModeWindowSize();
    static Auto = (struct) =>
      new ScalingMode("Auto", new ScalingModeAuto(struct));
    static FixedVertical = (value) => new ScalingMode("FixedVertical", value);
    static FixedHorizontal = (value) =>
      new ScalingMode("FixedHorizontal", value);
    static typeName = "bevy_render::camera::projection::ScalingMode";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ScalingMode.prototype)
    ))();

  class WindowOriginCenter extends ReflectableUnit {
    static typeName = "bevy_render::camera::projection::WindowOrigin";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Center");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), WindowOrigin.prototype)
    ))();
  class WindowOriginBottomLeft extends ReflectableUnit {
    static typeName = "bevy_render::camera::projection::WindowOrigin";
    static typeId = new Uint8Array(8);
    constructor() {
      super("BottomLeft");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), WindowOrigin.prototype)
    ))();
  class WindowOrigin extends ReflectableEnum {
    static Center = () => new WindowOriginCenter();
    static BottomLeft = () => new WindowOriginBottomLeft();
    static typeName = "bevy_render::camera::projection::WindowOrigin";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), WindowOrigin.prototype)
    ))();

  if (!window.hasOwnProperty("bevyRender")) {
    window.bevyRender = {};
  }
  if (!window.bevyRender.hasOwnProperty("camera")) {
    window.bevyRender.camera = {};
  }
  if (!window.bevyRender.camera.hasOwnProperty("projection")) {
    window.bevyRender.camera.projection = {};
  }
  Object.assign(window.bevyRender.camera.projection, {
    OrthographicProjection,
    PerspectiveProjection,
    Projection,
    ScalingMode,
    WindowOrigin,
  });
})(globalThis);
