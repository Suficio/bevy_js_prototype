"use strict";
import {
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
} from "./../../../bevy.js";
export class OrthographicProjection extends ReflectableObject {
    constructor(struct) {
        super({
            left: -1.0,
            right: 1.0,
            bottom: -1.0,
            top: 1.0,
            near: 0.0,
            far: 1000.0,
            window_origin: WindowOrigin.Center(),
            scaling_mode: ScalingMode.WindowSize(),
            scale: 1.0,
        }, struct)
    }
    typeName() {
        return "bevy_render::camera::projection::OrthographicProjection"
    }
}
export class PerspectiveProjection extends ReflectableObject {
    constructor(struct) {
        super({
            fov: 0.7853982,
            aspect_ratio: 1.0,
            near: 0.1,
            far: 1000.0,
        }, struct)
    }
    typeName() {
        return "bevy_render::camera::projection::PerspectiveProjection"
    }
}
export class Projection extends ReflectableEnum {
    static Perspective = (value) => new Projection("Perspective", value);
    static Orthographic = (value) => new Projection("Orthographic", value);
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_render::camera::projection::Projection"
    }
}
export class ScalingModeNone extends ReflectableUnit {
    constructor() {
        super("None")
    }
    typeName() {
        return "bevy_render::camera::projection::ScalingMode"
    }
};
export class ScalingModeWindowSize extends ReflectableUnit {
    constructor() {
        super("WindowSize")
    }
    typeName() {
        return "bevy_render::camera::projection::ScalingMode"
    }
};
export class ScalingModeAuto extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::camera::projection::ScalingMode"
    }
}
export class ScalingMode extends ReflectableEnum {
    static None = () => new ScalingModeNone();
    static WindowSize = () => new ScalingModeWindowSize();
    static Auto = (defaults, struct) => new ScalingMode("Auto", new ScalingModeAuto(defaults, struct));
    static FixedVertical = (value) => new ScalingMode("FixedVertical", value);
    static FixedHorizontal = (value) => new ScalingMode("FixedHorizontal", value);
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_render::camera::projection::ScalingMode"
    }
}
export class WindowOriginCenter extends ReflectableUnit {
    constructor() {
        super("Center")
    }
    typeName() {
        return "bevy_render::camera::projection::WindowOrigin"
    }
};
export class WindowOriginBottomLeft extends ReflectableUnit {
    constructor() {
        super("BottomLeft")
    }
    typeName() {
        return "bevy_render::camera::projection::WindowOrigin"
    }
};
export class WindowOrigin extends ReflectableEnum {
    static Center = () => new WindowOriginCenter();
    static BottomLeft = () => new WindowOriginBottomLeft();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_render::camera::projection::WindowOrigin"
    }
}