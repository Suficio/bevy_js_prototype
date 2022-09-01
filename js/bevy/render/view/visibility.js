"use strict";
import {
    ReflectableObject,
} from "./../../../bevy.js";
export class ComputedVisibility extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::view::visibility::ComputedVisibility"
    }
}
export class Visibility extends ReflectableObject {
    constructor(struct) {
        super({
            is_visible: true,
        }, struct)
    }
    typeName() {
        return "bevy_render::view::visibility::Visibility"
    }
}
export class VisibleEntities extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_render::view::visibility::VisibleEntities"
    }
}