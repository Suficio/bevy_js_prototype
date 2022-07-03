"use strict";

import { ReflectableStruct } from "../bevy";
import { Vector2 } from "../../node_modules/three/src/math/Vector2";

export class UiRect extends ReflectableStruct {
    constructor(associated, struct) {
        super(
            "bevy_ui_geometry::UiRect",
            {
                left: associated,
                right: associated,
                top: associated,
                bottom: associated
            },
            struct
        )
    }

    get left() {
        return this.struct.left;
    }

    set left(left) {
        this.struct.left = left;
    }

    get right() {
        return this.struct.height;
    }

    set right(right) {
        this.struct.right = right;
    }

    get top() {
        return this.struct.top;
    }

    set top(top) {
        this.struct.top = top;
    }

    get bottom() {
        return this.struct.bottom;
    }

    set bottom(bottom) {
        this.struct.bottom = bottom;
    }
}

export class Size extends ReflectableStruct {
    constructor(associated = Number, struct) {
        super(
            "bevy_ui::geometry::Size",
            {
                width: associated,
                height: associated,
            },
            struct,
        )

        let { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(Vector2.prototype);
        Object.defineProperties(Size.prototype, prototypePatch);

        Size.prototype.isVector2 = true;
    }

    // Vector2 implementation expects to be able to evaluate [`x`, `y`]
    // Vector2.prototype will itself provide [`width`, `height`] accessors

    get x() {
        return this.struct.width;
    }

    set x(x) {
        this.struct.width = x;
    }

    get y() {
        return this.struct.height;
    }

    set y(y) {
        this.struct.height = y;
    }
}