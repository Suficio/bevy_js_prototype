"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class Stopwatch extends ReflectableObject {
    constructor(struct) {
      super({ elapsed: { secs: 0, nanos: 0 }, paused: false }, struct);
    }
    typeName() {
      return "bevy_time::stopwatch::Stopwatch";
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
