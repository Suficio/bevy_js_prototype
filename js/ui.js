"use strict";

import { ReflectableEnum, ReflectableStruct } from "./bevy";
import { Vec2 } from "./math";

export class FocusPolicy extends ReflectableEnum {
    static Block = Symbol("block");
    static Pass = Symbol("pass");

    constructor(variant = FocusPolicy.Block, associated) {
        super("bevy_ui::focus::FocusPolicy", variant, associated);
    }

    toString() {
        switch (this.variant) {
            case FocusPolicy.Block:
                return "Block";
            case FocusPolicy.Pass:
                return "Pass";
        }
    }
}

// TODO: Should use a more manipulable representation
export class Size extends ReflectableStruct {
    constructor(struct) {
        super(
            "bevy_ui::geometry::Size",
            {
                width: 0,
                height: 0,
            },
            struct
        )
    }

    get width() {
        return this.struct.width;
    }

    set width(width) {
        if (!(width instanceof Number)) {
            throw new Error("Expected width to be instance of Number")
        }
        this.struct.width = width;
    }

    get height() {
        return this.struct.height;
    }

    set height(height) {
        if (!(height instanceof Number)) {
            throw new Error("Expected height to be instance of Number")
        }
        this.struct.height = height;
    }
}

export class Node extends ReflectableStruct {
    constructor(struct) {
        super(
            "bevy_ui::ui_node::Node",
            {
                size: new Vec2()
            },
            struct
        )
    }

    get size() {
        return this.struct.size;
    }

    set size(size) {
        if (!(size instanceof Vec2)) {
            throw new Error("Expected size to be instance of Vec2")
        }
        this.struct.size = size;
    }
}

export class CalculatedSize extends ReflectableStruct {
    constructor(struct) {
        super(
            "bevy_ui::ui_node::CalculatedSize",
            {
                size: new Size()
            },
            struct
        )
    }
}