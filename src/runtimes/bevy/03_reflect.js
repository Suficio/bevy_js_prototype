"use strict";

((window) => {
    class Reflectable {
        constructor(type) {
            this.type = type;
        }

        reflect() {
            return { type: this.type, value: this.reflectUntyped() };
        }

        reflectUntyped() {
            throw new Error("Reflectable must implement reflectUntyped");
        }
    }

    window.Bevy = Object.assign({ Reflectable }, window.Bevy);
})(globalThis);