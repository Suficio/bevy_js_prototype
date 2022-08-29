"use strict";
import {
    ReflectableValue,
    ReflectableObject,
    ReflectableEnum,
} from "./../../bevy.js";
export class AnchorCustom extends ReflectableValue {
    constructor(value) {
        super("Custom", null, value)
    }
}
export class Anchor extends ReflectableEnum {
    static Center = () => new Anchor("Center");
    static BottomLeft = () => new Anchor("BottomLeft");
    static BottomCenter = () => new Anchor("BottomCenter");
    static BottomRight = () => new Anchor("BottomRight");
    static CenterLeft = () => new Anchor("CenterLeft");
    static CenterRight = () => new Anchor("CenterRight");
    static TopLeft = () => new Anchor("TopLeft");
    static TopCenter = () => new Anchor("TopCenter");
    static TopRight = () => new Anchor("TopRight");
    static Custom = (...args) => new Anchor(new AnchorCustom(...args));
    constructor(value) {
        super("bevy_sprite::sprite::Anchor", null, value)
    }
};
export class Sprite extends ReflectableObject {
    constructor(struct) {
        super("bevy_sprite::sprite::Sprite", null, null, struct)
    }
    get color() {
        return this.struct.color;
    }
    set color(color) {
        this.struct.color = color
    }
    get flipX() {
        return this.struct.flip_x;
    }
    set flipX(flipX) {
        this.struct.flip_x = flipX
    }
    get flipY() {
        return this.struct.flip_y;
    }
    set flipY(flipY) {
        this.struct.flip_y = flipY
    }
    get customSize() {
        return this.struct.custom_size;
    }
    set customSize(customSize) {
        this.struct.custom_size = customSize
    }
    get anchor() {
        return this.struct.anchor;
    }
    set anchor(anchor) {
        this.struct.anchor = anchor
    }
};