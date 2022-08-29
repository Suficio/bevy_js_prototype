"use strict";
import {
    ReflectableObject,
} from "./../bevy.js";
export class AnimationPlayer extends ReflectableObject {
    constructor(struct) {
        super("bevy_animation::AnimationPlayer", null, null, struct)
    }
    get paused() {
        return this.struct.paused;
    }
    set paused(paused) {
        this.struct.paused = paused
    }
    get repeat() {
        return this.struct.repeat;
    }
    set repeat(repeat) {
        this.struct.repeat = repeat
    }
    get speed() {
        return this.struct.speed;
    }
    set speed(speed) {
        this.struct.speed = speed
    }
    get elapsed() {
        return this.struct.elapsed;
    }
    set elapsed(elapsed) {
        this.struct.elapsed = elapsed
    }
    get animationClip() {
        return this.struct.animation_clip;
    }
    set animationClip(animationClip) {
        this.struct.animation_clip = animationClip
    }
};