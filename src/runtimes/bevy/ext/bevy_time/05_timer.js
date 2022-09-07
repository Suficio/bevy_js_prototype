"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  const { Stopwatch } = window.bevyTime.stopwatch;
  class Timer extends ReflectableObject {
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
    typeName() {
      return "bevy_time::timer::Timer";
    }
  }
  if (!window.hasOwnProperty("bevyTime")) {
    window.bevyTime = {};
  }
  if (!window.bevyTime.hasOwnProperty("timer")) {
    window.bevyTime.timer = {};
  }
  Object.assign(window.bevyTime.timer, { Timer });
})(globalThis);
