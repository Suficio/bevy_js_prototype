"use strict";
((window) => {
  const { waitForWorld, worldResourceId } = window.bevyEcs;
  class Option {
    static None = () => undefined;
    static Some = (value) => value;
    static typeName = "core::option::Option";
    static typeId = new Uint8Array(8);
    constructor(value) {
      return value;
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Option.prototype)
    ))();

  if (!window.hasOwnProperty("core")) {
    window.core = {};
  }
  if (!window.core.hasOwnProperty("option")) {
    window.core.option = {};
  }
  Object.assign(window.core.option, { Option });
})(globalThis);
