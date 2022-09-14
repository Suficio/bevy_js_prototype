"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class Time extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_time::time::Time";
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
