"use strict";
((window) => {
  const {
    ReflectableArray,
    ReflectableEnum,
    ReflectableUnit,
    TypeRegistry,
    worldResourceId,
  } = window.Bevy.ecs;

  class ClearColor extends ReflectableArray {
    static typeName = "bevy_core_pipeline::clear_color::ClearColor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(seq) {
      super(null, seq);
    }
  }

  class ClearColorConfigDefault extends ReflectableUnit {
    static typeName = "bevy_core_pipeline::clear_color::ClearColorConfig";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Default");
    }
  }
  class ClearColorConfigNone extends ReflectableUnit {
    static typeName = "bevy_core_pipeline::clear_color::ClearColorConfig";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("None");
    }
  }
  class ClearColorConfig extends ReflectableEnum {
    static Default = () => new ClearColorConfigDefault();
    static Custom = (value) => new ClearColorConfig("Custom", value);
    static None = () => new ClearColorConfigNone();

    static typeName = "bevy_core_pipeline::clear_color::ClearColorConfig";
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
  if (!window.Bevy.pipeline.hasOwnProperty("clearColor")) {
    window.Bevy.pipeline.clearColor = {};
  }

  Object.assign(window.Bevy.pipeline.clearColor, {
    ClearColor,
    ClearColorConfig,
  });
})(globalThis);
