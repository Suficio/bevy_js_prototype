"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class Size extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_ui::geometry::Size"
    }
}
export class UiRect extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_ui::geometry::UiRect"
    }
}