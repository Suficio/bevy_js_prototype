"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class Children extends ReflectableArray {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_hierarchy::components::children::Children"
    }
}