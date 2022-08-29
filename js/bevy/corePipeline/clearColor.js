"use strict";
import {
    ReflectableValue,
    ReflectableArray,
    ReflectableEnum,
} from "./../../bevy.js";
export class ClearColor extends ReflectableArray {
    constructor(seq) {
        super("bevy_core_pipeline::clear_color::ClearColor", null, null, seq)
    }
}
export class ClearColorConfigCustom extends ReflectableValue {
    constructor(value) {
        super("Custom", null, value)
    }
}
export class ClearColorConfig extends ReflectableEnum {
    static Default = () => new ClearColorConfig("Default");
    static Custom = (...args) => new ClearColorConfig(new ClearColorConfigCustom(...args));
    static None = () => new ClearColorConfig("None");
    constructor(value) {
        super("bevy_core_pipeline::clear_color::ClearColorConfig", null, value)
    }
};