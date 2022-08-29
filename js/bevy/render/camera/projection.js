"use strict";
import {
    ReflectableObject,
    ReflectableEnum,
    ReflectableValue,
} from "./../../../bevy.js";
export class ProjectionPerspective extends ReflectableValue {
    constructor(value) {
        super("Perspective", Projection.Perspective([new PerspectiveProjection({
            fov: 0.7853982,
            aspect_ratio: 1.0,
            near: 0.1,
            far: 1000.0,
        }), ]), value)
    }
}
export class ProjectionOrthographic extends ReflectableValue {
    constructor(value) {
        super("Orthographic", Projection.Perspective([new PerspectiveProjection({
            fov: 0.7853982,
            aspect_ratio: 1.0,
            near: 0.1,
            far: 1000.0,
        }), ]), value)
    }
}
export class Projection extends ReflectableEnum {
    static Perspective = (...args) => new Projection(new ProjectionPerspective(...args));
    static Orthographic = (...args) => new Projection(new ProjectionOrthographic(...args));
    constructor(value) {
        super("bevy_render::camera::projection::Projection", null, value)
    }
};
export class PerspectiveProjection extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::camera::projection::PerspectiveProjection", null, {
            fov: 0.7853982,
            aspect_ratio: 1.0,
            near: 0.1,
            far: 1000.0,
        }, struct)
    }
    get fov() {
        return this.struct.fov;
    }
    set fov(fov) {
        this.struct.fov = fov
    }
    get aspectRatio() {
        return this.struct.aspect_ratio;
    }
    set aspectRatio(aspectRatio) {
        this.struct.aspect_ratio = aspectRatio
    }
    get near() {
        return this.struct.near;
    }
    set near(near) {
        this.struct.near = near
    }
    get far() {
        return this.struct.far;
    }
    set far(far) {
        this.struct.far = far
    }
};
export class ScalingModeAuto extends ReflectableObject {
    constructor(struct) {
        super("Auto", null, null, struct)
    }
}
export class ScalingModeFixedVertical extends ReflectableValue {
    constructor(value) {
        super("FixedVertical", null, value)
    }
}
export class ScalingModeFixedHorizontal extends ReflectableValue {
    constructor(value) {
        super("FixedHorizontal", null, value)
    }
}
export class ScalingMode extends ReflectableEnum {
    static None = () => new ScalingMode("None");
    static WindowSize = () => new ScalingMode("WindowSize");
    static Auto = (...args) => new ScalingMode(new ScalingModeAuto(...args));
    static FixedVertical = (...args) => new ScalingMode(new ScalingModeFixedVertical(...args));
    static FixedHorizontal = (...args) => new ScalingMode(new ScalingModeFixedHorizontal(...args));
    constructor(value) {
        super("bevy_render::camera::projection::ScalingMode", null, value)
    }
};
export class OrthographicProjection extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::camera::projection::OrthographicProjection", null, {
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
    get bottom() {
        return this.struct.bottom;
    }
    set bottom(bottom) {
        this.struct.bottom = bottom
    }
    get top() {
        return this.struct.top;
    }
    set top(top) {
        this.struct.top = top
    }
    get near() {
        return this.struct.near;
    }
    set near(near) {
        this.struct.near = near
    }
    get far() {
        return this.struct.far;
    }
    set far(far) {
        this.struct.far = far
    }
    get windowOrigin() {
        return this.struct.window_origin;
    }
    set windowOrigin(windowOrigin) {
        this.struct.window_origin = windowOrigin
    }
    get scalingMode() {
        return this.struct.scaling_mode;
    }
    set scalingMode(scalingMode) {
        this.struct.scaling_mode = scalingMode
    }
    get scale() {
        return this.struct.scale;
    }
    set scale(scale) {
        this.struct.scale = scale
    }
};
export class WindowOrigin extends ReflectableEnum {
    static Center = () => new WindowOrigin("Center");
    static BottomLeft = () => new WindowOrigin("BottomLeft");
    constructor(value) {
        super("bevy_render::camera::projection::WindowOrigin", null, value)
    }
};