"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Time extends ReflectableObject {
    constructor(struct) {
        super("bevy_time::time::Time", null, null, struct)
    }
    get delta() {
        return this.struct.delta;
    }
    set delta(delta) {
        this.struct.delta = delta
    }
    get lastUpdate() {
        return this.struct.last_update;
    }
    set lastUpdate(lastUpdate) {
        this.struct.last_update = lastUpdate
    }
    get deltaSecondsF64() {
        return this.struct.delta_seconds_f64;
    }
    set deltaSecondsF64(deltaSecondsF64) {
        this.struct.delta_seconds_f64 = deltaSecondsF64
    }
    get deltaSeconds() {
        return this.struct.delta_seconds;
    }
    set deltaSeconds(deltaSeconds) {
        this.struct.delta_seconds = deltaSeconds
    }
    get secondsSinceStartup() {
        return this.struct.seconds_since_startup;
    }
    set secondsSinceStartup(secondsSinceStartup) {
        this.struct.seconds_since_startup = secondsSinceStartup
    }
    get timeSinceStartup() {
        return this.struct.time_since_startup;
    }
    set timeSinceStartup(timeSinceStartup) {
        this.struct.time_since_startup = timeSinceStartup
    }
    get startup() {
        return this.struct.startup;
    }
    set startup(startup) {
        this.struct.startup = startup
    }
};