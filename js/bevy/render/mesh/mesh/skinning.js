"use strict";
import {
    ReflectableObject,
} from "./../../../../bevy.js";
export class SkinnedMesh extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::mesh::mesh::skinning::SkinnedMesh"
    }
}