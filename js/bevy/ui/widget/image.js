"use strict";
import {
    ReflectableEnum,
} from "./../../../bevy.js";
export class ImageMode extends ReflectableEnum {
    static KeepAspect = () => new ImageMode("KeepAspect");
    constructor(value) {
        super("bevy_ui::widget::image::ImageMode", null, value)
    }
};