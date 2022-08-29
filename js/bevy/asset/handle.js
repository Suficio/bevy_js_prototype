"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Handle extends ReflectableObject {
    constructor(generics, struct) {
        super("bevy_asset::handle::Handle", generics, null, struct)
    }
    get id() {
        return this.struct.id;
    }
    set id(id) {
        this.struct.id = id
    }
};