"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Stopwatch extends ReflectableObject {
    constructor(struct) {
        super("bevy_time::stopwatch::Stopwatch", null, {
            elapsed: {
                "secs": 0,
                "nanos": 0
            },
            paused: false,
        }, struct)
    }
    get elapsed() {
        return this.struct.elapsed;
    }
    set elapsed(elapsed) {
        this.struct.elapsed = elapsed
    }
    get paused() {
        return this.struct.paused;
    }
    set paused(paused) {
        this.struct.paused = paused
    }
};