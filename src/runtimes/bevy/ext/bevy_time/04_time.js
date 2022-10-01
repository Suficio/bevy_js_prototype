"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Time extends ReflectableObject {
    static typeName = "bevy_time::time::Time";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
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
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Time.prototype)
    ))();
  if (!window.hasOwnProperty("bevyTime")) {
    window.bevyTime = {};
  }
  if (!window.bevyTime.hasOwnProperty("time")) {
    window.bevyTime.time = {};
  }
  Object.assign(window.bevyTime.time, { Time });
})(globalThis);
