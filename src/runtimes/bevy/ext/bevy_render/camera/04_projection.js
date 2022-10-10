"use strict";
((window) => {
  const {
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    TypeRegistry,
    worldResourceId,
  } = window.Bevy.ecs;

  class OrthographicProjection extends ReflectableObject {
    static typeName = "bevy_render::camera::projection::OrthographicProjection";
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

  class PerspectiveProjection extends ReflectableObject {
    static typeName = "bevy_render::camera::projection::PerspectiveProjection";
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
        { fov: 0.7853982, aspect_ratio: 1.0, near: 0.1, far: 1000.0 },
        struct
      );
    }
  }

  class Projection extends ReflectableEnum {
    static Perspective = (value) => new Projection("Perspective", value);
    static Orthographic = (value) => new Projection("Orthographic", value);

    static typeName = "bevy_render::camera::projection::Projection";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class ScalingModeNone extends ReflectableUnit {
    static typeName = "bevy_render::camera::projection::ScalingMode";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor() {
      super("None");
    }
  }
  class ScalingModeWindowSize extends ReflectableUnit {
    static typeName = "bevy_render::camera::projection::ScalingMode";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor() {
      super("WindowSize");
    }
  }
  class ScalingModeAuto extends ReflectableObject {
    static typeName = "bevy_render::camera::projection::ScalingMode";
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
  class ScalingMode extends ReflectableEnum {
    static None = () => new ScalingModeNone();
    static WindowSize = () => new ScalingModeWindowSize();
    static Auto = (struct) =>
      new ScalingMode("Auto", new ScalingModeAuto(struct));
    static FixedVertical = (value) => new ScalingMode("FixedVertical", value);
    static FixedHorizontal = (value) =>
      new ScalingMode("FixedHorizontal", value);

    static typeName = "bevy_render::camera::projection::ScalingMode";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class WindowOriginCenter extends ReflectableUnit {
    static typeName = "bevy_render::camera::projection::WindowOrigin";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor() {
      super("Center");
    }
  }
  class WindowOriginBottomLeft extends ReflectableUnit {
    static typeName = "bevy_render::camera::projection::WindowOrigin";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor() {
      super("BottomLeft");
    }
  }
  class WindowOrigin extends ReflectableEnum {
    static Center = () => new WindowOriginCenter();
    static BottomLeft = () => new WindowOriginBottomLeft();

    static typeName = "bevy_render::camera::projection::WindowOrigin";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(type, value) {
      super(type, value);
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
  if (!window.Bevy.render.camera.hasOwnProperty("projection")) {
    window.Bevy.render.camera.projection = {};
  }

  Object.assign(window.Bevy.render.camera.projection, {
    OrthographicProjection,
    PerspectiveProjection,
    Projection,
    ScalingMode,
    WindowOrigin,
  });
})(globalThis);
