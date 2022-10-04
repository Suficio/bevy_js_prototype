"use strict";

((window) => {
  const { core } = window.Deno;

  // Need to instruct how to serialize BigInt
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  const worldResourceId = (() => {
    let res = core.resources();
    let rid = Object.keys(res).find(
      (rid) => res[rid] === "bevy_js::world::WorldResource"
    );
    if (rid === undefined) {
      throw new Error(
        "Could not find Bevy world resource id. Ensure that you are running within a Bevy context."
      );
    }

    return rid;
  })();

  function reflect(reflectable) {
    try {
      return reflectable.reflect();
    } catch (err) {
      throw new Error(`Object must implement method "reflect" in order to be reflected:
${err}`);
    }
  }

  async function nextFrame() {
    await core.opAsync("op_wait_for_frame", worldResourceId);
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("ecs")) {
    window.Bevy.ecs = {};
  }
  Object.assign(window.Bevy.ecs, { reflect, nextFrame, worldResourceId });
})(globalThis);
