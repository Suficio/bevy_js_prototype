"use strict";

((window) => {
    const { ObjectAssign } = window.__bootstrap.primordials;

    class Reflectable {
        constructor(type) {
            this.type = type;
        }

        reflect() {
            return { type: this.type, value: this.reflect_untyped() };
        }

        reflect_untyped() {
            throw new Error("Reflectable must implement relfect_untyped");
        }
    }

    window.Bevy = ObjectAssign({ Reflectable }, window.Bevy);
})(globalThis);