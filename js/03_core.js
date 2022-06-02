"use strict";

((window) => {
    const { ObjectAssign } = window.__bootstrap.primordials;
    const core = window.Deno.core;

    function worldResourceId() {
        let res = core.resources();
        let rid = Object.keys(res).find(rid => res[rid] === "bevy::World");
        if (rid === undefined) {
            throw new Error("Could not find Bevy world resource id. Ensure that you are running within a Bevy context.");
        }

        return rid;
    }

    async function system(rid, ...args) {
        let rid_req = await core.opAsync("op_register_system", rid, args);
        // core.opSync("op_system", rid, rid_req);
        // Deno.core.print(rid_req + "\n");
    }

    const bevy = { worldResourceId, system };

    window.Bevy = bevy;
})(globalThis);