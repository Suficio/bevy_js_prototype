"use strict";

import { ReflectableStruct } from "./bevy";

export class Visibility extends ReflectableStruct {
    constructor(struct) {
        super(
            "bevy_render::view::visibility::Visibility",
            {
                is_visible: true,
            },
            struct
        );
    }

    get is_visible() {
        return this.struct.is_visible;
    }

    set is_visible(is_visible) {
        if (!(size instanceof Boolean)) {
            throw new Error("Expected is_visible to be instance of Boolean")
        }

        this.struct.is_visible = is_visible;
    }
}
