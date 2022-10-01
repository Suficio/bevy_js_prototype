"use strict";
((window) => {
  const {
    Reflect,
    ReflectableArray,
    ReflectableEnum,
    ReflectableUnit,
    waitForWorld,
    worldResourceId,
  } = window.bevyEcs;
  class ClearColor extends ReflectableArray {
    static typeName = "bevy_core_pipeline::clear_color::ClearColor";
    static typeId = new Uint8Array(8);
    constructor(seq) {
      super(null, seq);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ClearColor.prototype)
    ))();

  class ClearColorConfigDefault extends ReflectableUnit {
    static typeName = "bevy_core_pipeline::clear_color::ClearColorConfig";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Default");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ClearColorConfig.prototype)
    ))();
  class ClearColorConfigNone extends ReflectableUnit {
    static typeName = "bevy_core_pipeline::clear_color::ClearColorConfig";
    static typeId = new Uint8Array(8);
    constructor() {
      super("None");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ClearColorConfig.prototype)
    ))();
  class ClearColorConfig extends ReflectableEnum {
    static Default = () => new ClearColorConfigDefault();
    static Custom = (value) => new ClearColorConfig("Custom", value);
    static None = () => new ClearColorConfigNone();
    static typeName = "bevy_core_pipeline::clear_color::ClearColorConfig";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ClearColorConfig.prototype)
    ))();

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
