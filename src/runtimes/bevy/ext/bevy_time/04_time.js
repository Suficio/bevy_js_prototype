"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;
  const { ops } = window.Deno.core;

  class Time extends ReflectableObject {
    static typeName = "bevy_time::time::Time";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(null, struct);
    }

    static delta() {
      return ops.op_time_delta();
    }
    static deltaSeconds() {
      return ops.op_time_delta_seconds();
    }
    static secondsSinceStartup() {
      return ops.op_time_seconds_since_startup();
    }
    static timeSinceStartup() {
      return ops.op_time_since_startup();
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
