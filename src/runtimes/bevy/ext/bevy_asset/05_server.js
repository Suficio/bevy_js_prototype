"use strict";

((window) => {
  const core = window.__bootstrap.core;
  const { worldResourceId } = window.bevyEcs;

  class AssetServer {
    constructor() {}

    static load(path) {
      const id = core.opSync("op_asset_server_load", worldResourceId(), path);
      // TODO: We can currently get away with not returning the proper type
      return { id };
    }
  }

  Object.assign(window.bevyAsset, { AssetServer });
})(globalThis);
