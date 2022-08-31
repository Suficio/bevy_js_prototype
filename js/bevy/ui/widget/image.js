"use strict";
import {
    ReflectableEnum,
    ReflectableUnit,
} from "./../../../bevy.js";
export class ImageModeKeepAspect extends ReflectableUnit {
    constructor() {
        super("KeepAspect")
    }
    typeName() {
        return "bevy_ui::widget::image::ImageMode"
    }
};
export class ImageMode extends ReflectableEnum {
    static KeepAspect = () => new ImageModeKeepAspect();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::widget::image::ImageMode"
    }
};