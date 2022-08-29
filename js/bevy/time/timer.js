"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
import {
    Stopwatch,
} from "./stopwatch.js";
export class Timer extends ReflectableObject {
    constructor(struct) {
        super("bevy_time::timer::Timer", null, {
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
    get stopwatch() {
        return this.struct.stopwatch;
    }
    set stopwatch(stopwatch) {
        this.struct.stopwatch = stopwatch
    }
    get duration() {
        return this.struct.duration;
    }
    set duration(duration) {
        this.struct.duration = duration
    }
    get repeating() {
        return this.struct.repeating;
    }
    set repeating(repeating) {
        this.struct.repeating = repeating
    }
    get finished() {
        return this.struct.finished;
    }
    set finished(finished) {
        this.struct.finished = finished
    }
    get timesFinishedThisTick() {
        return this.struct.times_finished_this_tick;
    }
    set timesFinishedThisTick(timesFinishedThisTick) {
        this.struct.times_finished_this_tick = timesFinishedThisTick
    }
};