"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Stopwatch extends ReflectableObject {
    static typeName = "bevy_time::stopwatch::Stopwatch";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super({ elapsed: { secs: 0, nanos: 0 }, paused: false }, struct);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("time")) {
    window.Bevy.time = {};
  }
  if (!window.Bevy.time.hasOwnProperty("stopwatch")) {
    window.Bevy.time.stopwatch = {};
  }
  Object.assign(window.Bevy.time.stopwatch, { Stopwatch });
})(globalThis);
