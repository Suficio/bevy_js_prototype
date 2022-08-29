"use strict";
import {
    Vec,
} from "./../../alloc/vec.js";
import {
    ReflectableObject,
    ReflectableEnum,
} from "./../../bevy.js";
export class HorizontalAlign extends ReflectableEnum {
    static Left = () => new HorizontalAlign("Left");
    static Center = () => new HorizontalAlign("Center");
    static Right = () => new HorizontalAlign("Right");
    constructor(value) {
        super("bevy_text::text::HorizontalAlign", null, value)
    }
};
export class TextAlignment extends ReflectableObject {
    constructor(struct) {
        super("bevy_text::text::TextAlignment", null, null, struct)
    }
    get vertical() {
        return this.struct.vertical;
    }
    set vertical(vertical) {
        this.struct.vertical = vertical
    }
    get horizontal() {
        return this.struct.horizontal;
    }
    set horizontal(horizontal) {
        this.struct.horizontal = horizontal
    }
};
export class TextStyle extends ReflectableObject {
    constructor(struct) {
        super("bevy_text::text::TextStyle", null, null, struct)
    }
    get font() {
        return this.struct.font;
    }
    set font(font) {
        this.struct.font = font
    }
    get fontSize() {
        return this.struct.font_size;
    }
    set fontSize(fontSize) {
        this.struct.font_size = fontSize
    }
    get color() {
        return this.struct.color;
    }
    set color(color) {
        this.struct.color = color
    }
};
export class Text extends ReflectableObject {
    constructor(struct) {
        super("bevy_text::text::Text", null, {
            sections: [],
            alignment: new TextAlignment({
                vertical: VerticalAlign.Top(),
                horizontal: HorizontalAlign.Left(),
            }),
        }, struct)
    }
    get sections() {
        return this.struct.sections;
    }
    set sections(sections) {
        this.struct.sections = sections
    }
    get alignment() {
        return this.struct.alignment;
    }
    set alignment(alignment) {
        this.struct.alignment = alignment
    }
};
export class VerticalAlign extends ReflectableEnum {
    static Top = () => new VerticalAlign("Top");
    static Center = () => new VerticalAlign("Center");
    static Bottom = () => new VerticalAlign("Bottom");
    constructor(value) {
        super("bevy_text::text::VerticalAlign", null, value)
    }
};
export class TextSection extends ReflectableObject {
    constructor(struct) {
        super("bevy_text::text::TextSection", null, null, struct)
    }
    get value() {
        return this.struct.value;
    }
    set value(value) {
        this.struct.value = value
    }
    get style() {
        return this.struct.style;
    }
    set style(style) {
        this.struct.style = style
    }
};