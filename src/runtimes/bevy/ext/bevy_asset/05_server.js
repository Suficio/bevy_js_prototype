"use strict";

((window) => {
    const core = window.__bootstrap.core;
    const { worldResourceId } = window.Bevy;

    class AssetServer {
        constructor() { }

        static load(path) {
            return core.opSync("op_asset_server_load", worldResourceId(), path)
        }
    }

    window.Bevy.asset = Object.assign({ AssetServer }, window.Bevy.asset);
})(globalThis);