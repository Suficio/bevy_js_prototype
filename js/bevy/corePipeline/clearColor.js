"use strict";
import {
    ReflectableArray,
    ReflectableEnum,
    ReflectableUnit,
} from "./../../bevy.js";
export class ClearColor extends ReflectableArray {
    constructor(seq) {
        super(null, seq)
    }
    typeName() {
        return "bevy_core_pipeline::clear_color::ClearColor"
    }
}
export class ClearColorConfigDefault extends ReflectableUnit {
    constructor() {
        super("Default")
    }
    typeName() {
        return "bevy_core_pipeline::clear_color::ClearColorConfig"
    }
};
export class ClearColorConfigNone extends ReflectableUnit {
    constructor() {
        super("None")
    }
    typeName() {
        return "bevy_core_pipeline::clear_color::ClearColorConfig"
    }
};
export class ClearColorConfig extends ReflectableEnum {
    static Default = () => new ClearColorConfigDefault();
    static Custom = (value) => new ClearColorConfig("Custom", value);
    static None = () => new ClearColorConfigNone();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_core_pipeline::clear_color::ClearColorConfig"
    }
}