"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Time extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_time::time::Time"
    }
}