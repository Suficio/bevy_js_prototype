"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Name extends ReflectableObject {
    constructor(struct) {
        super("bevy_core::name::Name", null, {
            hash: 11227240506050851714,
            name: "",
        }, struct)
    }
    get hash() {
        return this.struct.hash;
    }
    set hash(hash) {
        this.struct.hash = hash
    }
    get name() {
        return this.struct.name;
    }
    set name(name) {
        this.struct.name = name
    }
};