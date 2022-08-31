"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class GlobalTransform extends ReflectableArray {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_transform::components::global_transform::GlobalTransform"
    }
}