"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Name extends ReflectableObject {
    constructor(struct) {
        super({
            hash: 3309698360916821802,
            name: "",
        }, struct)
    }
    typeName() {
        return "bevy_core::name::Name"
    }
}