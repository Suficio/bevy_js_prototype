"use strict";
import {
    ReflectableEnum,
    ReflectableObject,
    ReflectableValue,
} from "./../../../bevy.js";
export class Camera3dDepthLoadOpClear extends ReflectableValue {
    constructor(value) {
        super("Clear", null, value)
    }
}
export class Camera3dDepthLoadOp extends ReflectableEnum {
    static Clear = (...args) => new Camera3dDepthLoadOp(new Camera3dDepthLoadOpClear(...args));
    static Load = () => new Camera3dDepthLoadOp("Load");
    constructor(value) {
        super("bevy_core_pipeline::core_3d::camera_3d::Camera3dDepthLoadOp", null, value)
    }
};
export class Camera3d extends ReflectableObject {
    constructor(struct) {
        super("bevy_core_pipeline::core_3d::camera_3d::Camera3d", null, null, struct)
    }
    get clearColor() {
        return this.struct.clear_color;
    }
    set clearColor(clearColor) {
        this.struct.clear_color = clearColor
    }
    get depthLoadOp() {
        return this.struct.depth_load_op;
    }
    set depthLoadOp(depthLoadOp) {
        this.struct.depth_load_op = depthLoadOp
    }
};