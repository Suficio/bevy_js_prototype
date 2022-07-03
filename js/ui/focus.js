"use strict";

import { ReflectableEnum, ReflectableEnumEntry } from "../bevy";

export class InteractionClicked extends ReflectableEnumEntry {
    constructor() {
        super("Clicked", [])
    }
}

export class InteractionHovered extends ReflectableEnumEntry {
    constructor() {
        super("Hovered", [])
    }
}

export class InteractionNone extends ReflectableEnumEntry {
    constructor() {
        super("None", [])
    }
}

export class Interaction extends ReflectableEnum {
    static Clicked = InteractionClicked;
    static Hovered = InteractionHovered;
    static None = InteractionNone;

    constructor(value = new InteractionNone()) {
        super("bevy_ui::focus::Interaction", value);
    }
}

export class FocusPolicyBlock extends ReflectableEnumEntry {
    constructor() {
        super("Block", [])
    }
}

export class FocusPolicyPass extends ReflectableEnumEntry {
    constructor() {
        super("Pass", [])
    }
}

export class FocusPolicy extends ReflectableEnum {
    static Block = FocusPolicyBlock;
    static Pass = FocusPolicyPass;

    constructor(value = new FocusPolicyBlock()) {
        super("bevy_ui::focus::FocusPolicy", value);
    }
}