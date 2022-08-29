"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Size extends ReflectableObject {
    constructor(struct) {
        super("bevy_ui::geometry::Size", null, null, struct)
    }
    get width() {
        return this.struct.width;
    }
    set width(width) {
        this.struct.width = width
    }
    get height() {
        return this.struct.height;
    }
    set height(height) {
        this.struct.height = height
    }
};
export class UiRect extends ReflectableObject {
    constructor(struct) {
        super("bevy_ui::geometry::UiRect", null, null, struct)
    }
    get left() {
        return this.struct.left;
    }
    set left(left) {
        this.struct.left = left
    }
    get right() {
        return this.struct.right;
    }
    set right(right) {
        this.struct.right = right
    }
    get top() {
        return this.struct.top;
    }
    set top(top) {
        this.struct.top = top
    }
    get bottom() {
        return this.struct.bottom;
    }
    set bottom(bottom) {
        this.struct.bottom = bottom
    }
};