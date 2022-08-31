"use strict";
import {
    ReflectableObject,
} from "./../bevy.js";
export class GltfExtras extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_gltf::GltfExtras"
    }
}