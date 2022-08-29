"use strict";
import {
    ReflectableObject,
} from "./../../../bevy.js";
export class Camera2d extends ReflectableObject {
    constructor(struct) {
        super("bevy_core_pipeline::core_2d::camera_2d::Camera2d", null, null, struct)
    }
    get clearColor() {
        return this.struct.clear_color;
    }
    set clearColor(clearColor) {
        this.struct.clear_color = clearColor
    }
};