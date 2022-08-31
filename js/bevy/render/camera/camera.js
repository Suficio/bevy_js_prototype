"use strict";
import {
    ReflectableArray,
    ReflectableObject,
} from "./../../../bevy.js";
import {
    UVec2,
} from "./../../../glam/u32/uvec2.js";
export class Camera extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::camera::camera::Camera"
    }
}
export class CameraRenderGraph extends ReflectableArray {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::camera::camera::CameraRenderGraph"
    }
}
export class Viewport extends ReflectableObject {
    constructor(struct) {
        super({
            physical_position: new UVec2({
                x: 0,
                y: 0,
            }),
            physical_size: new UVec2({
                x: 0,
                y: 0,
            }),
            depth: null,
        }, struct)
    }
    typeName() {
        return "bevy_render::camera::camera::Viewport"
    }
}