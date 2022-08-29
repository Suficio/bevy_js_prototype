"use strict";
import {
    ReflectableObject,
    ReflectableEnum,
} from "./../../bevy.js";
export class ColorRgba extends ReflectableObject {
    constructor(struct) {
        super("Rgba", null, null, struct)
    }
}
export class ColorRgbaLinear extends ReflectableObject {
    constructor(struct) {
        super("RgbaLinear", null, null, struct)
    }
}
export class ColorHsla extends ReflectableObject {
    constructor(struct) {
        super("Hsla", null, null, struct)
    }
}
export class Color extends ReflectableEnum {
    static Rgba = (...args) => new Color(new ColorRgba(...args));
    static RgbaLinear = (...args) => new Color(new ColorRgbaLinear(...args));
    static Hsla = (...args) => new Color(new ColorHsla(...args));
    constructor(value) {
        super("bevy_render::color::Color", null, value)
    }
};