"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;

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

  if (!window.hasOwnProperty("bevyTime")) {
    window.bevyTime = {};
  }
  if (!window.bevyTime.hasOwnProperty("stopwatch")) {
    window.bevyTime.stopwatch = {};
  }
  Object.assign(window.bevyTime.stopwatch, { Stopwatch });
})(globalThis);
