"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;
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

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("time")) {
    window.Bevy.time = {};
  }
  if (!window.Bevy.time.hasOwnProperty("time")) {
    window.Bevy.time.time = {};
  }
  Object.assign(window.Bevy.time.time, { Time });
})(globalThis);
