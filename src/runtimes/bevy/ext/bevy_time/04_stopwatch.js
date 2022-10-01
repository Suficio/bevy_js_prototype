"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Stopwatch extends ReflectableObject {
    static typeName = "bevy_time::stopwatch::Stopwatch";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ elapsed: { secs: 0, nanos: 0 }, paused: false }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Stopwatch.prototype)
    ))();

  if (!window.hasOwnProperty("bevyTime")) {
    window.bevyTime = {};
  }
  if (!window.bevyTime.hasOwnProperty("stopwatch")) {
    window.bevyTime.stopwatch = {};
  }
  Object.assign(window.bevyTime.stopwatch, { Stopwatch });
})(globalThis);
