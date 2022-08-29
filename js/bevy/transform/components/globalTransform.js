"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class GlobalTransform extends ReflectableArray {
    constructor(seq) {
        super("bevy_transform::components::global_transform::GlobalTransform", null, null, seq)
    }
}