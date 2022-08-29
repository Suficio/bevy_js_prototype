"use strict";
import {
    ReflectableObject,
    ReflectableArray,
} from "./../../../bevy.js";
import {
    UVec2,
} from "./../../../glam/u32/uvec2.js";
export class Viewport extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::camera::camera::Viewport", null, {
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
    get physicalPosition() {
        return this.struct.physical_position;
    }
    set physicalPosition(physicalPosition) {
        this.struct.physical_position = physicalPosition
    }
    get physicalSize() {
        return this.struct.physical_size;
    }
    set physicalSize(physicalSize) {
        this.struct.physical_size = physicalSize
    }
    get depth() {
        return this.struct.depth;
    }
    set depth(depth) {
        this.struct.depth = depth
    }
};
export class CameraRenderGraph extends ReflectableArray {
    constructor(seq) {
        super("bevy_render::camera::camera::CameraRenderGraph", null, null, seq)
    }
}
export class Camera extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::camera::camera::Camera", null, null, struct)
    }
    get viewport() {
        return this.struct.viewport;
    }
    set viewport(viewport) {
        this.struct.viewport = viewport
    }
    get priority() {
        return this.struct.priority;
    }
    set priority(priority) {
        this.struct.priority = priority
    }
    get isActive() {
        return this.struct.is_active;
    }
    set isActive(isActive) {
        this.struct.is_active = isActive
    }
};