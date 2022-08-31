"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Aabb extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::primitives::Aabb"
    }
}
export class CubemapFrusta extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::primitives::CubemapFrusta"
    }
}
export class Frustum extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::primitives::Frustum"
    }
}