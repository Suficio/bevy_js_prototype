"use strict";

import { ReflectableStruct } from "./bevy";

// TODO: Should use a more manipulable representation
export class Vec2 extends ReflectableStruct {
    constructor(struct) {
        super(
            "glam::vec2::Vec2",
            {
                x: 0.0,
                y: 0.0,
            },
            struct
        )
    }
}
