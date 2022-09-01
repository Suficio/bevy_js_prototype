"use strict";
import {
    Vec,
} from "./../../alloc/vec.js";
import {
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
} from "./../../bevy.js";
export class HorizontalAlignLeft extends ReflectableUnit {
    constructor() {
        super("Left")
    }
    typeName() {
        return "bevy_text::text::HorizontalAlign"
    }
};
export class HorizontalAlignCenter extends ReflectableUnit {
    constructor() {
        super("Center")
    }
    typeName() {
        return "bevy_text::text::HorizontalAlign"
    }
};
export class HorizontalAlignRight extends ReflectableUnit {
    constructor() {
        super("Right")
    }
    typeName() {
        return "bevy_text::text::HorizontalAlign"
    }
};
export class HorizontalAlign extends ReflectableEnum {
    static Left = () => new HorizontalAlignLeft();
    static Center = () => new HorizontalAlignCenter();
    static Right = () => new HorizontalAlignRight();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_text::text::HorizontalAlign"
    }
}
export class Text extends ReflectableObject {
    constructor(struct) {
        super({
            sections: [],
            alignment: new TextAlignment({
                vertical: VerticalAlign.Top(),
                horizontal: HorizontalAlign.Left(),
            }),
        }, struct)
    }
    typeName() {
        return "bevy_text::text::Text"
    }
}
export class TextAlignment extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_text::text::TextAlignment"
    }
}
export class TextSection extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_text::text::TextSection"
    }
}
export class TextStyle extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_text::text::TextStyle"
    }
}
export class VerticalAlignTop extends ReflectableUnit {
    constructor() {
        super("Top")
    }
    typeName() {
        return "bevy_text::text::VerticalAlign"
    }
};
export class VerticalAlignCenter extends ReflectableUnit {
    constructor() {
        super("Center")
    }
    typeName() {
        return "bevy_text::text::VerticalAlign"
    }
};
export class VerticalAlignBottom extends ReflectableUnit {
    constructor() {
        super("Bottom")
    }
    typeName() {
        return "bevy_text::text::VerticalAlign"
    }
};
export class VerticalAlign extends ReflectableEnum {
    static Top = () => new VerticalAlignTop();
    static Center = () => new VerticalAlignCenter();
    static Bottom = () => new VerticalAlignBottom();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_text::text::VerticalAlign"
    }
}