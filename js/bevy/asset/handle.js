"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Handle extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_asset::handle::Handle"
    }
}