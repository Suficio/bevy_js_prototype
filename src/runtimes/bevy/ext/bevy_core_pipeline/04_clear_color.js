"use strict";
((window) => {
  const { ReflectableArray, ReflectableEnum, ReflectableUnit } = window.bevyEcs;
  class ClearColor extends ReflectableArray {
    constructor(seq) {
      super(null, seq);
    }
    static typeName() {
      return "bevy_core_pipeline::clear_color::ClearColor";
    }
  }
  class ClearColorConfigDefault extends ReflectableUnit {
    constructor() {
      super("Default");
    }
    static typeName() {
      return "bevy_core_pipeline::clear_color::ClearColorConfig";
    }
  }
  class ClearColorConfigNone extends ReflectableUnit {
    constructor() {
      super("None");
    }
    static typeName() {
      return "bevy_core_pipeline::clear_color::ClearColorConfig";
    }
  }
  class ClearColorConfig extends ReflectableEnum {
    static Default = () => new ClearColorConfigDefault();
    static Custom = (value) => new ClearColorConfig("Custom", value);
    static None = () => new ClearColorConfigNone();
    constructor(type, value) {
      super(type, value);
    }
    static typeName() {
      return "bevy_core_pipeline::clear_color::ClearColorConfig";
    }
  }
  if (!window.hasOwnProperty("bevyCorePipeline")) {
    window.bevyCorePipeline = {};
  }
  if (!window.bevyCorePipeline.hasOwnProperty("clearColor")) {
    window.bevyCorePipeline.clearColor = {};
  }
  Object.assign(window.bevyCorePipeline.clearColor, {
    ClearColor,
    ClearColorConfig,
  });
})(globalThis);
