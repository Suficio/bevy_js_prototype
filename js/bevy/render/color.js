"use strict";
import {
    ReflectableEnum,
    ReflectableObject,
} from "./../../bevy.js";
export class ColorRgba extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::color::Color"
    }
}
export class ColorRgbaLinear extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::color::Color"
    }
}
export class ColorHsla extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::color::Color"
    }
}
export class Color extends ReflectableEnum {
    static Rgba = (defaults, struct) => new Color("Rgba", new ColorRgba(defaults, struct));
    static RgbaLinear = (defaults, struct) => new Color("RgbaLinear", new ColorRgbaLinear(defaults, struct));
    static Hsla = (defaults, struct) => new Color("Hsla", new ColorHsla(defaults, struct));
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_render::color::Color"
    }
}