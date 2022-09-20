"use strict";
((window) => {
  const { core } = window.Deno;
  const { ReflectableObject } = window.bevyEcs;
  class Time extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_time::time::Time";
    }
    static delta() {
      return core.ops.op_time_delta();
    }
    static deltaSeconds() {
      return core.ops.op_time_delta_seconds();
    }
    static secondsSinceStartup() {
      return core.ops.op_time_seconds_since_startup();
    }
    static timeSinceStartup() {
      return core.ops.op_time_since_startup();
    }
  }
  if (!window.hasOwnProperty("bevyTime")) {
    window.bevyTime = {};
  }
  if (!window.bevyTime.hasOwnProperty("time")) {
    window.bevyTime.time = {};
  }
  Object.assign(window.bevyTime.time, { Time });
})(globalThis);
