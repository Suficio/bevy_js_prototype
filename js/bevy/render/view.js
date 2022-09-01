"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Msaa extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::view::Msaa"
    }
}