"use strict";
import {
    ReflectableObject,
} from "./../bevy.js";
export class GltfExtras extends ReflectableObject {
    constructor(struct) {
        super("bevy_gltf::GltfExtras", null, null, struct)
    }
    get value() {
        return this.struct.value;
    }
    set value(value) {
        this.struct.value = value
    }
};