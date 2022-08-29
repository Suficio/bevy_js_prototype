"use strict";
import {
    ReflectableObject,
} from "./../../../../bevy.js";
export class SkinnedMesh extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::mesh::mesh::skinning::SkinnedMesh", null, null, struct)
    }
    get inverseBindposes() {
        return this.struct.inverse_bindposes;
    }
    set inverseBindposes(inverseBindposes) {
        this.struct.inverse_bindposes = inverseBindposes
    }
    get joints() {
        return this.struct.joints;
    }
    set joints(joints) {
        this.struct.joints = joints
    }
};