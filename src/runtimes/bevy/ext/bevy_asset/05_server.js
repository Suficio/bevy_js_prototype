"use strict";

((window) => {
  const core = window.__bootstrap.core;
  const { worldResourceId } = window.Bevy;

  class AssetServer {
    constructor() {}

    static load(path) {
      const id = core.opSync("op_asset_server_load", worldResourceId(), path);
      // TODO: We can currently get away with not returning the proper type
      return { id };
    }
  }

  window.Bevy.asset = Object.assign(window.Bevy.asset, { AssetServer });
})(globalThis);
