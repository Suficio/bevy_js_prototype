"use strict";
((window) => {
  const { ReflectableObject } = window.Bevy.ecs;

  class Handle extends ReflectableObject {
    static typeName = "bevy_asset::handle::Handle";

    constructor(struct) {
      super(null, struct);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("asset")) {
    window.Bevy.asset = {};
  }
  if (!window.Bevy.asset.hasOwnProperty("handle")) {
    window.Bevy.asset.handle = {};
  }

  Object.assign(window.Bevy.asset.handle, { Handle });
})(globalThis);
