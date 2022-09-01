"use strict";
import {
    ReflectableObject,
} from "./../../../bevy.js";
export class Camera2d extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_core_pipeline::core_2d::camera_2d::Camera2d"
    }
}