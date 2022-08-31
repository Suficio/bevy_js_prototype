"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
import {
    Stopwatch,
} from "./stopwatch.js";
export class Timer extends ReflectableObject {
    constructor(struct) {
        super({
            stopwatch: new Stopwatch({
                elapsed: {
                    "secs": 0,
                    "nanos": 0
                },
                paused: false,
            }),
            duration: {
                "secs": 0,
                "nanos": 0
            },
            repeating: false,
            finished: false,
            times_finished_this_tick: 0,
        }, struct)
    }
    typeName() {
        return "bevy_time::timer::Timer"
    }
}