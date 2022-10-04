"use strict";

((window) => {
  const { core } = window.Deno;
  const { worldResourceId } = window.Bevy.ecs;

  class AssetServer {
    constructor() {}

    static load(path) {
      const id = core.ops.op_asset_server_load(worldResourceId, path);
      // TODO: We can currently get away with not returning the proper type
      return { id };
    }
  }

  Object.assign(window.Bevy.asset, { AssetServer });
})(globalThis);
