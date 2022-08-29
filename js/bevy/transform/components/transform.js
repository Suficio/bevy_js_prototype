"use strict";
import {
    Vec3,
} from "./../../../glam/f32/vec3.js";
import {
    ReflectableObject,
} from "./../../../bevy.js";
export class Transform extends ReflectableObject {
    constructor(struct) {
        super("bevy_transform::components::transform::Transform", null, {
            translation: new Vec3({
                x: 0.0,
                y: 0.0,
                z: 0.0,
            }),
            rotation: [0.0, 0.0, 0.0, 1.0],
            scale: new Vec3({
                x: 1.0,
                y: 1.0,
                z: 1.0,
            }),
        }, struct)
    }
    get translation() {
        return this.struct.translation;
    }
    set translation(translation) {
        this.struct.translation = translation
    }
    get rotation() {
        return this.struct.rotation;
    }
    set rotation(rotation) {
        this.struct.rotation = rotation
    }
    get scale() {
        return this.struct.scale;
    }
    set scale(scale) {
        this.struct.scale = scale
    }
};