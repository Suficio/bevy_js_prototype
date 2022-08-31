"use strict";
import {
    ReflectableUnit,
    ReflectableEnum,
} from "./../../bevy.js";
export class FocusPolicyBlock extends ReflectableUnit {
    constructor() {
        super("Block")
    }
    typeName() {
        return "bevy_ui::focus::FocusPolicy"
    }
};
export class FocusPolicyPass extends ReflectableUnit {
    constructor() {
        super("Pass")
    }
    typeName() {
        return "bevy_ui::focus::FocusPolicy"
    }
};
export class FocusPolicy extends ReflectableEnum {
    static Block = () => new FocusPolicyBlock();
    static Pass = () => new FocusPolicyPass();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::focus::FocusPolicy"
    }
};
export class InteractionClicked extends ReflectableUnit {
    constructor() {
        super("Clicked")
    }
    typeName() {
        return "bevy_ui::focus::Interaction"
    }
};
export class InteractionHovered extends ReflectableUnit {
    constructor() {
        super("Hovered")
    }
    typeName() {
        return "bevy_ui::focus::Interaction"
    }
};
export class InteractionNone extends ReflectableUnit {
    constructor() {
        super("None")
    }
    typeName() {
        return "bevy_ui::focus::Interaction"
    }
};
export class Interaction extends ReflectableEnum {
    static Clicked = () => new InteractionClicked();
    static Hovered = () => new InteractionHovered();
    static None = () => new InteractionNone();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::focus::Interaction"
    }
};