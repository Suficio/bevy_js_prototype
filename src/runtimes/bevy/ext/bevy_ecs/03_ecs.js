"use strict";

((window) => {
  const { core } = window.Deno;

  // Need to instruct how to serialize BigInt
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  // Cache global reference to the `World` resource
  let rWorld = undefined;

  function worldResourceId() {
    if (rWorld) {
      return rWorld;
    } else {
      let res = core.resources();
      let rid = Object.keys(res).find(
        (rid) => res[rid] === "bevy_js::world::WorldResource"
      );
      if (rid === undefined) {
        throw new Error(
          "Could not find Bevy world resource id. Ensure that you are running within a Bevy context."
        );
      }

      return rWorld;
    }
  }

  function reflect(reflectable) {
    try {
      return reflectable.reflect();
    } catch (err) {
      throw new Error(`Object must implement method "reflect" in order to be reflected:
${err}`);
    }
  }

  async function waitForWorld() {
    await core.opAsync("op_wait_for_world", worldResourceId());
  }

  let bevyEcs = {
    reflect,
    waitForWorld,
    worldResourceId,
  };
  Object.assign(window, { bevyEcs });
})(globalThis);
