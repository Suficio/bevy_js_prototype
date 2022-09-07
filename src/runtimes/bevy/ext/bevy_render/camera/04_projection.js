"use strict";
((window) => {
  const { ReflectableEnum, ReflectableObject, ReflectableUnit } =
    window.bevyEcs.reflect;
  class OrthographicProjection extends ReflectableObject {
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
    typeName() {
      return "bevy_render::camera::projection::OrthographicProjection";
    }
  }
  class PerspectiveProjection extends ReflectableObject {
    constructor(struct) {
      super(
        { fov: 0.7853982, aspect_ratio: 1.0, near: 0.1, far: 1000.0 },
        struct
      );
    }
    typeName() {
      return "bevy_render::camera::projection::PerspectiveProjection";
    }
  }
  class Projection extends ReflectableEnum {
    static Perspective = (value) => new Projection("Perspective", value);
    static Orthographic = (value) => new Projection("Orthographic", value);
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_render::camera::projection::Projection";
    }
  }
  class ScalingModeNone extends ReflectableUnit {
    constructor() {
      super("None");
    }
    typeName() {
      return "bevy_render::camera::projection::ScalingMode";
    }
  }
  class ScalingModeWindowSize extends ReflectableUnit {
    constructor() {
      super("WindowSize");
    }
    typeName() {
      return "bevy_render::camera::projection::ScalingMode";
    }
  }
  class ScalingModeAuto extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_render::camera::projection::ScalingMode";
    }
  }
  class ScalingMode extends ReflectableEnum {
    static None = () => new ScalingModeNone();
    static WindowSize = () => new ScalingModeWindowSize();
    static Auto = (defaults, struct) =>
      new ScalingMode("Auto", new ScalingModeAuto(defaults, struct));
    static FixedVertical = (value) => new ScalingMode("FixedVertical", value);
    static FixedHorizontal = (value) =>
      new ScalingMode("FixedHorizontal", value);
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_render::camera::projection::ScalingMode";
    }
  }
  class WindowOriginCenter extends ReflectableUnit {
    constructor() {
      super("Center");
    }
    typeName() {
      return "bevy_render::camera::projection::WindowOrigin";
    }
  }
  class WindowOriginBottomLeft extends ReflectableUnit {
    constructor() {
      super("BottomLeft");
    }
    typeName() {
      return "bevy_render::camera::projection::WindowOrigin";
    }
  }
  class WindowOrigin extends ReflectableEnum {
    static Center = () => new WindowOriginCenter();
    static BottomLeft = () => new WindowOriginBottomLeft();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_render::camera::projection::WindowOrigin";
    }
  }
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
