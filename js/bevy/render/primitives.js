"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Aabb extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::primitives::Aabb", null, null, struct)
    }
    get center() {
        return this.struct.center;
    }
    set center(center) {
        this.struct.center = center
    }
    get halfExtents() {
        return this.struct.half_extents;
    }
    set halfExtents(halfExtents) {
        this.struct.half_extents = halfExtents
    }
};
export class CubemapFrusta extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::primitives::CubemapFrusta", null, null, struct)
    }
};
export class Frustum extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::primitives::Frustum", null, null, struct)
    }
};