"use strict";

((window) => {
  const { core } = window.Deno;
  const { worldResourceId } = window.bevyEcs;

  class AssetServer {
    constructor() {}

    static load(path) {
      const id = core.ops.op_asset_server_load(worldResourceId(), path);
      // TODO: We can currently get away with not returning the proper type
      return { id };
    }
  }

  Object.assign(window.bevyAsset, { AssetServer });
})(globalThis);
