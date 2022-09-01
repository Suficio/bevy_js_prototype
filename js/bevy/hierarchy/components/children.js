"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class Children extends ReflectableArray {
    constructor(seq) {
        super(null, seq)
    }
    typeName() {
        return "bevy_hierarchy::components::children::Children"
    }
}