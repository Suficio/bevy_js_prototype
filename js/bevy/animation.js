"use strict";
import {
    ReflectableObject,
} from "./../bevy.js";
export class AnimationPlayer extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_animation::AnimationPlayer"
    }
}