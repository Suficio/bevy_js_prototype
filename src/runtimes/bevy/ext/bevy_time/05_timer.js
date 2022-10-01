"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  const { Stopwatch } = window.bevyTime.stopwatch;
  class Timer extends ReflectableObject {
    static typeName = "bevy_time::timer::Timer";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(
        {
          stopwatch: new Stopwatch({
            elapsed: { secs: 0, nanos: 0 },
            paused: false,
          }),
          duration: { secs: 0, nanos: 0 },
          repeating: false,
          finished: false,
          times_finished_this_tick: 0,
        },
        struct
      );
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Timer.prototype)
    ))();

  if (!window.hasOwnProperty("bevyTime")) {
    window.bevyTime = {};
  }
  if (!window.bevyTime.hasOwnProperty("timer")) {
    window.bevyTime.timer = {};
  }
  Object.assign(window.bevyTime.timer, { Timer });
})(globalThis);
