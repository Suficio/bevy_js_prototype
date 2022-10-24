"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;
  const { Stopwatch } = window.Bevy.time.stopwatch;

  class Timer extends ReflectableObject {
    static typeName = "bevy_time::timer::Timer";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(struct) {
      super(
        {
          stopwatch: new Stopwatch({
            elapsed: { secs: 0, nanos: 0 },
            paused: false,
          }),
          duration: { secs: 0, nanos: 0 },
          mode: null,
          finished: false,
          times_finished_this_tick: 0,
        },
        struct
      );
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("time")) {
    window.Bevy.time = {};
  }
  if (!window.Bevy.time.hasOwnProperty("timer")) {
    window.Bevy.time.timer = {};
  }

  Object.assign(window.Bevy.time.timer, { Timer });
})(globalThis);
