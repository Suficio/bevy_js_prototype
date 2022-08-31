"use strict";
import {
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
} from "./../../../bevy.js";
export class Camera3d extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_core_pipeline::core_3d::camera_3d::Camera3d"
    }
}
export class Camera3dDepthLoadOpLoad extends ReflectableUnit {
    constructor() {
        super("Load")
    }
    typeName() {
        return "bevy_core_pipeline::core_3d::camera_3d::Camera3dDepthLoadOp"
    }
};
export class Camera3dDepthLoadOp extends ReflectableEnum {
    static Clear = (value) => new Camera3dDepthLoadOp("Clear", value);
    static Load = () => new Camera3dDepthLoadOpLoad();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_core_pipeline::core_3d::camera_3d::Camera3dDepthLoadOp"
    }
}