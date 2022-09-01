"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Name extends ReflectableObject {
    constructor(struct) {
        super({
            hash: 9477529292423022968,
            name: "",
        }, struct)
    }
    typeName() {
        return "bevy_core::name::Name"
    }
}