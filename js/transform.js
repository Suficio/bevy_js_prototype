"use strict";

import { ReflectableStruct } from "./bevy";
import { Quat, Vec3 } from "./math";

export class Transform extends ReflectableStruct {
    constructor(struct) {
        super(
            "bevy_transform::components::transform::Transform",
            {
                translation: new Vec3().setScalar(0),
                rotation: new Quat().identity(),
                scale: new Vec3().setScalar(1),
            },
            struct
        )
    }

    get translation() {
        return this.struct.translation;
    }

    set translation(translation) {
        this.struct.translation = translation;
    }

    get rotation() {
        return this.struct.rotation;
    }

    set rotation(rotation) {
        this.struct.rotation = rotation;
    }

    get scale() {
        return this.struct.scale;
    }

    set scale(scale) {
        this.struct.scale = scale;
    }
}

export class GlobalTransform extends Transform {
    constructor(struct) {
        super(struct);
        this.type = "bevy_transform::components::global_transform::GlobalTransform";
    }
}