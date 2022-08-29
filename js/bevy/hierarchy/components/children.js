"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class Children extends ReflectableArray {
    constructor(seq) {
        super("bevy_hierarchy::components::children::Children", null, null, seq)
    }
}