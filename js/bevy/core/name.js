"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Name extends ReflectableObject {
    constructor(struct) {
        super({
            hash: 7664314576386785066,
            name: "",
        }, struct)
    }
    typeName() {
        return "bevy_core::name::Name"
    }
}