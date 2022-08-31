"use strict";
import {
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
} from "./../../bevy.js";
export class AnchorCenter extends ReflectableUnit {
    constructor() {
        super("Center")
    }
    typeName() {
        return "bevy_sprite::sprite::Anchor"
    }
};
export class AnchorBottomLeft extends ReflectableUnit {
    constructor() {
        super("BottomLeft")
    }
    typeName() {
        return "bevy_sprite::sprite::Anchor"
    }
};
export class AnchorBottomCenter extends ReflectableUnit {
    constructor() {
        super("BottomCenter")
    }
    typeName() {
        return "bevy_sprite::sprite::Anchor"
    }
};
export class AnchorBottomRight extends ReflectableUnit {
    constructor() {
        super("BottomRight")
    }
    typeName() {
        return "bevy_sprite::sprite::Anchor"
    }
};
export class AnchorCenterLeft extends ReflectableUnit {
    constructor() {
        super("CenterLeft")
    }
    typeName() {
        return "bevy_sprite::sprite::Anchor"
    }
};
export class AnchorCenterRight extends ReflectableUnit {
    constructor() {
        super("CenterRight")
    }
    typeName() {
        return "bevy_sprite::sprite::Anchor"
    }
};
export class AnchorTopLeft extends ReflectableUnit {
    constructor() {
        super("TopLeft")
    }
    typeName() {
        return "bevy_sprite::sprite::Anchor"
    }
};
export class AnchorTopCenter extends ReflectableUnit {
    constructor() {
        super("TopCenter")
    }
    typeName() {
        return "bevy_sprite::sprite::Anchor"
    }
};
export class AnchorTopRight extends ReflectableUnit {
    constructor() {
        super("TopRight")
    }
    typeName() {
        return "bevy_sprite::sprite::Anchor"
    }
};
export class Anchor extends ReflectableEnum {
    static Center = () => new AnchorCenter();
    static BottomLeft = () => new AnchorBottomLeft();
    static BottomCenter = () => new AnchorBottomCenter();
    static BottomRight = () => new AnchorBottomRight();
    static CenterLeft = () => new AnchorCenterLeft();
    static CenterRight = () => new AnchorCenterRight();
    static TopLeft = () => new AnchorTopLeft();
    static TopCenter = () => new AnchorTopCenter();
    static TopRight = () => new AnchorTopRight();
    static Custom = (value) => new Anchor("Custom", value);
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_sprite::sprite::Anchor"
    }
}
export class Sprite extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_sprite::sprite::Sprite"
    }
}