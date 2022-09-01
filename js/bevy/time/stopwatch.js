"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Stopwatch extends ReflectableObject {
    constructor(struct) {
        super({
            elapsed: {
                "secs": 0,
                "nanos": 0
            },
            paused: false,
        }, struct)
    }
    typeName() {
        return "bevy_time::stopwatch::Stopwatch"
    }
}