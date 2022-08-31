"use strict";
import {
    ReflectableObject,
} from "./../../../bevy.js";
export class Button extends ReflectableObject {
    constructor(struct) {
        super({}, struct)
    }
    typeName() {
        return "bevy_ui::widget::button::Button"
    }
}