"use strict";

((window) => {
    const core = window.__bootstrap.core;
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

            let reflected = component.reflect();
            try {
                core.opSync("op_entity_insert_component", component, this.entity, reflected);
            } catch (error) {
                throw new Error(`Could not insert component into entity ${this.entity}\n${JSON.stringify(reflected)}\n${error}`)
            }
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

        await core.opAsync("op_request_system", ridWorld);
    }

    window.Bevy = Object.assign({ system, Entity, World }, window.Bevy);
})(globalThis);