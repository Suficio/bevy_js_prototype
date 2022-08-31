"use strict";
import {
    ReflectableObject,
} from "./../../../bevy.js";
import {
    Vec3,
} from "./../../../glam/f32/vec3.js";
export class Transform extends ReflectableObject {
    constructor(struct) {
        super({
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
    typeName() {
        return "bevy_transform::components::transform::Transform"
    }
}