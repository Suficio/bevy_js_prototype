"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Msaa extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::view::Msaa", null, null, struct)
    }
    get samples() {
        return this.struct.samples;
    }
    set samples(samples) {
        this.struct.samples = samples
    }
};