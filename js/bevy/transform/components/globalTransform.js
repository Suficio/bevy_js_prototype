"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class GlobalTransform extends ReflectableArray {
    constructor(seq) {
        super(null, seq)
    }
    typeName() {
        return "bevy_transform::components::global_transform::GlobalTransform"
    }
}