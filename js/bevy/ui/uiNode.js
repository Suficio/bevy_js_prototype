"use strict";
import {
    Color,
} from "./../render/color.js";
import {
    Option,
} from "./../../core/option.js";
import {
    ReflectableEnum,
    ReflectableValue,
    ReflectableArray,
    ReflectableObject,
} from "./../../bevy.js";
import {
    Vec2,
} from "./../../glam/f32/vec2.js";
import {
    Size,
    UiRect,
} from "./geometry.js";
import {
    Handle,
} from "./../asset/handle.js";
export class CalculatedSize extends ReflectableObject {
    constructor(struct) {
        super("bevy_ui::ui_node::CalculatedSize", null, null, struct)
    }
    get size() {
        return this.struct.size;
    }
    set size(size) {
        this.struct.size = size
    }
};
export class AlignItems extends ReflectableEnum {
    static FlexStart = () => new AlignItems("FlexStart");
    static FlexEnd = () => new AlignItems("FlexEnd");
    static Center = () => new AlignItems("Center");
    static Baseline = () => new AlignItems("Baseline");
    static Stretch = () => new AlignItems("Stretch");
    constructor(value) {
        super("bevy_ui::ui_node::AlignItems", null, value)
    }
};
export class FlexWrap extends ReflectableEnum {
    static NoWrap = () => new FlexWrap("NoWrap");
    static Wrap = () => new FlexWrap("Wrap");
    static WrapReverse = () => new FlexWrap("WrapReverse");
    constructor(value) {
        super("bevy_ui::ui_node::FlexWrap", null, value)
    }
};
export class AlignContent extends ReflectableEnum {
    static FlexStart = () => new AlignContent("FlexStart");
    static FlexEnd = () => new AlignContent("FlexEnd");
    static Center = () => new AlignContent("Center");
    static Stretch = () => new AlignContent("Stretch");
    static SpaceBetween = () => new AlignContent("SpaceBetween");
    static SpaceAround = () => new AlignContent("SpaceAround");
    constructor(value) {
        super("bevy_ui::ui_node::AlignContent", null, value)
    }
};
export class PositionType extends ReflectableEnum {
    static Relative = () => new PositionType("Relative");
    static Absolute = () => new PositionType("Absolute");
    constructor(value) {
        super("bevy_ui::ui_node::PositionType", null, value)
    }
};
export class UiImage extends ReflectableArray {
    constructor(seq) {
        super("bevy_ui::ui_node::UiImage", null, [new Handle({
            id: {
                "Id": ["6ea26da6-6cf8-4ea2-9986-1d7bf6c17d6f", 13148262314052771789]
            },
        }), ], seq)
    }
}
export class JustifyContent extends ReflectableEnum {
    static FlexStart = () => new JustifyContent("FlexStart");
    static FlexEnd = () => new JustifyContent("FlexEnd");
    static Center = () => new JustifyContent("Center");
    static SpaceBetween = () => new JustifyContent("SpaceBetween");
    static SpaceAround = () => new JustifyContent("SpaceAround");
    static SpaceEvenly = () => new JustifyContent("SpaceEvenly");
    constructor(value) {
        super("bevy_ui::ui_node::JustifyContent", null, value)
    }
};
export class ValPx extends ReflectableValue {
    constructor(value) {
        super("Px", null, value)
    }
}
export class ValPercent extends ReflectableValue {
    constructor(value) {
        super("Percent", null, value)
    }
}
export class Val extends ReflectableEnum {
    static Undefined = () => new Val("Undefined");
    static Auto = () => new Val("Auto");
    static Px = (...args) => new Val(new ValPx(...args));
    static Percent = (...args) => new Val(new ValPercent(...args));
    constructor(value) {
        super("bevy_ui::ui_node::Val", null, value)
    }
};
export class AlignSelf extends ReflectableEnum {
    static Auto = () => new AlignSelf("Auto");
    static FlexStart = () => new AlignSelf("FlexStart");
    static FlexEnd = () => new AlignSelf("FlexEnd");
    static Center = () => new AlignSelf("Center");
    static Baseline = () => new AlignSelf("Baseline");
    static Stretch = () => new AlignSelf("Stretch");
    constructor(value) {
        super("bevy_ui::ui_node::AlignSelf", null, value)
    }
};
export class Display extends ReflectableEnum {
    static Flex = () => new Display("Flex");
    static None = () => new Display("None");
    constructor(value) {
        super("bevy_ui::ui_node::Display", null, value)
    }
};
export class Overflow extends ReflectableEnum {
    static Visible = () => new Overflow("Visible");
    static Hidden = () => new Overflow("Hidden");
    constructor(value) {
        super("bevy_ui::ui_node::Overflow", null, value)
    }
};
export class UiColor extends ReflectableArray {
    constructor(seq) {
        super("bevy_ui::ui_node::UiColor", null, [Color.Rgba({
            red: 1.0,
            green: 1.0,
            blue: 1.0,
            alpha: 1.0,
        }), ], seq)
    }
}
export class Node extends ReflectableObject {
    constructor(struct) {
        super("bevy_ui::ui_node::Node", null, {
            size: new Vec2({
                x: 0.0,
                y: 0.0,
            }),
        }, struct)
    }
    get size() {
        return this.struct.size;
    }
    set size(size) {
        this.struct.size = size
    }
};
export class Direction extends ReflectableEnum {
    static Inherit = () => new Direction("Inherit");
    static LeftToRight = () => new Direction("LeftToRight");
    static RightToLeft = () => new Direction("RightToLeft");
    constructor(value) {
        super("bevy_ui::ui_node::Direction", null, value)
    }
};
export class FlexDirection extends ReflectableEnum {
    static Row = () => new FlexDirection("Row");
    static Column = () => new FlexDirection("Column");
    static RowReverse = () => new FlexDirection("RowReverse");
    static ColumnReverse = () => new FlexDirection("ColumnReverse");
    constructor(value) {
        super("bevy_ui::ui_node::FlexDirection", null, value)
    }
};
export class Style extends ReflectableObject {
    constructor(struct) {
        super("bevy_ui::ui_node::Style", null, {
            display: Display.Flex(),
            position_type: PositionType.Relative(),
            direction: Direction.Inherit(),
            flex_direction: FlexDirection.Row(),
            flex_wrap: FlexWrap.NoWrap(),
            align_items: AlignItems.Stretch(),
            align_self: AlignSelf.Auto(),
            align_content: AlignContent.Stretch(),
            justify_content: JustifyContent.FlexStart(),
            position: new UiRect({
                left: Val.Undefined(),
                right: Val.Undefined(),
                top: Val.Undefined(),
                bottom: Val.Undefined(),
            }),
            margin: new UiRect({
                left: Val.Undefined(),
                right: Val.Undefined(),
                top: Val.Undefined(),
                bottom: Val.Undefined(),
            }),
            padding: new UiRect({
                left: Val.Undefined(),
                right: Val.Undefined(),
                top: Val.Undefined(),
                bottom: Val.Undefined(),
            }),
            border: new UiRect({
                left: Val.Undefined(),
                right: Val.Undefined(),
                top: Val.Undefined(),
                bottom: Val.Undefined(),
            }),
            flex_grow: 0.0,
            flex_shrink: 1.0,
            flex_basis: Val.Auto(),
            size: new Size({
                width: Val.Auto(),
                height: Val.Auto(),
            }),
            min_size: new Size({
                width: Val.Auto(),
                height: Val.Auto(),
            }),
            max_size: new Size({
                width: Val.Auto(),
                height: Val.Auto(),
            }),
            aspect_ratio: Option.None(),
            overflow: Overflow.Visible(),
        }, struct)
    }
    get display() {
        return this.struct.display;
    }
    set display(display) {
        this.struct.display = display
    }
    get positionType() {
        return this.struct.position_type;
    }
    set positionType(positionType) {
        this.struct.position_type = positionType
    }
    get direction() {
        return this.struct.direction;
    }
    set direction(direction) {
        this.struct.direction = direction
    }
    get flexDirection() {
        return this.struct.flex_direction;
    }
    set flexDirection(flexDirection) {
        this.struct.flex_direction = flexDirection
    }
    get flexWrap() {
        return this.struct.flex_wrap;
    }
    set flexWrap(flexWrap) {
        this.struct.flex_wrap = flexWrap
    }
    get alignItems() {
        return this.struct.align_items;
    }
    set alignItems(alignItems) {
        this.struct.align_items = alignItems
    }
    get alignSelf() {
        return this.struct.align_self;
    }
    set alignSelf(alignSelf) {
        this.struct.align_self = alignSelf
    }
    get alignContent() {
        return this.struct.align_content;
    }
    set alignContent(alignContent) {
        this.struct.align_content = alignContent
    }
    get justifyContent() {
        return this.struct.justify_content;
    }
    set justifyContent(justifyContent) {
        this.struct.justify_content = justifyContent
    }
    get position() {
        return this.struct.position;
    }
    set position(position) {
        this.struct.position = position
    }
    get margin() {
        return this.struct.margin;
    }
    set margin(margin) {
        this.struct.margin = margin
    }
    get padding() {
        return this.struct.padding;
    }
    set padding(padding) {
        this.struct.padding = padding
    }
    get border() {
        return this.struct.border;
    }
    set border(border) {
        this.struct.border = border
    }
    get flexGrow() {
        return this.struct.flex_grow;
    }
    set flexGrow(flexGrow) {
        this.struct.flex_grow = flexGrow
    }
    get flexShrink() {
        return this.struct.flex_shrink;
    }
    set flexShrink(flexShrink) {
        this.struct.flex_shrink = flexShrink
    }
    get flexBasis() {
        return this.struct.flex_basis;
    }
    set flexBasis(flexBasis) {
        this.struct.flex_basis = flexBasis
    }
    get size() {
        return this.struct.size;
    }
    set size(size) {
        this.struct.size = size
    }
    get minSize() {
        return this.struct.min_size;
    }
    set minSize(minSize) {
        this.struct.min_size = minSize
    }
    get maxSize() {
        return this.struct.max_size;
    }
    set maxSize(maxSize) {
        this.struct.max_size = maxSize
    }
    get aspectRatio() {
        return this.struct.aspect_ratio;
    }
    set aspectRatio(aspectRatio) {
        this.struct.aspect_ratio = aspectRatio
    }
    get overflow() {
        return this.struct.overflow;
    }
    set overflow(overflow) {
        this.struct.overflow = overflow
    }
};