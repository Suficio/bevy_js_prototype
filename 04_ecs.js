"use strict";

((window) => {
    const { primordials: { ObjectAssign }, core } = window.__bootstrap;
    const { Reflectable } = window.Bevy;

    function worldResourceId() {
        let res = core.resources();
        let rid = Object.keys(res).find(rid => res[rid] === "bevy_js::Resource");
        if (rid === undefined) {
            throw new Error("Could not find Bevy world resource id. Ensure that you are running within a Bevy context.");
        }

        return rid;
    }

    // Cache global reference to the `World` resource
    let ridWorld = undefined;

    class Entity {
        constructor(eEntity) {
            this.entity = eEntity
        }

        id() {
            return this.eEntity
        }

        insert(component) {
            if (!(component instanceof Reflectable)) {
                throw new Error("Component must have Reflectable prototype");
            }

            core.opSync("op_entity_insert_component", component, this.entity, component.reflect());
        }

        remove(component) { }

        despawn() { }
    }

    class World {
        constructor() {
            if (ridWorld === undefined) {
                throw new Error("World was not borrowed when constructing World in JS")
            }
        }

        entity(eEntity) {
            return new Entity(eEntity)
        }

        spawn() {
            let eEntity = core.opSync("op_entity_spawn", ridWorld);
            return new Entity(eEntity)
        }
    };

    async function system(...args) {
        // Lazily extract wouldResourceId which is not otherwise available at
        // startup
        if (ridWorld === undefined) {
            ridWorld = worldResourceId();
        }

        // Last function should always be the callback function
        if (args.length === 0) {
            throw new Error(
                "No arguments were passed to the system, expected at least a callback function"
            );
        }

        const fn = args.pop();

        await core.opAsync("op_request_system", ridWorld);

        let callBind = [];
        for (let either of args) {
            if (either === World) {
                callBind.push(new World())
            }
        }

        fn.call(window, ...callBind);
    }

    window.Bevy = ObjectAssign({ system, Entity, World }, window.Bevy);
})(globalThis);