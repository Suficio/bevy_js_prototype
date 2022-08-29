"use strict";
import {
    ReflectableEnum,
} from "./../../bevy.js";
export class FocusPolicy extends ReflectableEnum {
    static Block = () => new FocusPolicy("Block");
    static Pass = () => new FocusPolicy("Pass");
    constructor(value) {
        super("bevy_ui::focus::FocusPolicy", null, value)
    }
};
export class Interaction extends ReflectableEnum {
    static Clicked = () => new Interaction("Clicked");
    static Hovered = () => new Interaction("Hovered");
    static None = () => new Interaction("None");
    constructor(value) {
        super("bevy_ui::focus::Interaction", null, value)
    }
};