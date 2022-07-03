"use strict";

import { ReflectableEnum, ReflectableStruct, ReflectableTupleStruct, ReflectableEnumEntry } from "../bevy";
import { Vec2 } from "../math";
import { Option } from "../rust";
import { UiRect, Size } from "./geometry";

export class Node extends ReflectableStruct {
    constructor(struct) {
        super(
            "bevy_ui::ui_node::Node",
            {
                size: new Vec2()
            },
            struct
        )
    }

    get size() {
        return this.struct.size;
    }

    set size(size) {
        this.struct.size = size;
    }
}

export class ValUndefined extends ReflectableEnumEntry {
    constructor() {
        super("Undefined", [])
    }
}

export class ValAuto extends ReflectableEnumEntry {
    constructor() {
        super("Auto", [])
    }
}

export class ValPx extends ReflectableEnumEntry {
    constructor(seq) {
        super("Px", [0.0], seq)
    }
}

export class ValPercent extends ReflectableEnumEntry {
    constructor(seq) {
        super("Percent", [0.0], seq)
    }
}

export class Val extends ReflectableEnum {
    static Undefined = (...args) => new Val(new ValUndefined(...args));;
    static Auto = (...args) => new Val(new ValAuto(...args));;
    static Px = (...args) => new Val(new ValPx(...args));;
    static Percent = (...args) => new Val(new ValPercent(...args));;

    constructor(value = new ValUndefined()) {
        super("bevy_ui::ui_node::Val", value);
    }
}

// Lawd he comin'
export class Style extends ReflectableStruct {
    constructor(struct) {
        super(
            "bevy_ui::ui_node::Style",
            {
                display: new Display(),
                position_type: new PositionType(),
                direction: new Direction(),
                flex_direction: new FlexDirection(),
                flex_wrap: new FlexWrap(),
                align_items: new AlignItems(),
                align_self: new AlignSelf(),
                align_content: new AlignContent(),
                justify_content: new JustifyContent(),
                position: new UiRect(new Val()),
                margin: new UiRect(new Val()),
                padding: new UiRect(new Val()),
                border: new UiRect(new Val()),
                flex_grow: 0.0,
                flex_shrink: 1.0,
                flex_basis: Val.Auto(),
                size: new Size(new Val(), { width: Val.Auto(), height: Val.Auto() }),
                min_size: new Size(new Val(), { width: Val.Auto(), height: Val.Auto() }),
                max_size: new Size(new Val(), { width: Val.Auto(), height: Val.Auto() }),
                aspect_ratio: new Option(),
                overflow: new Overflow()
            },
            struct
        )
    }

    get size() {
        return this.struct.size;
    }

    set size(size) {
        this.struct.size = size;
    }
}

export class AlignItemsFlexStart extends ReflectableEnumEntry {
    constructor() {
        super("FlexStart", []);
    }
}

export class AlignItemsFlexEnd extends ReflectableEnumEntry {
    constructor() {
        super("FlexEnd", []);
    }
}

export class AlignItemsCenter extends ReflectableEnumEntry {
    constructor() {
        super("Center", []);
    }
}

export class AlignItemsBaseline extends ReflectableEnumEntry {
    constructor() {
        super("Baseline", []);
    }
}

export class AlignItemsStretch extends ReflectableEnumEntry {
    constructor() {
        super("Stretch", []);
    }
}

export class AlignItems extends ReflectableEnum {
    static FlexStart = AlignItemsFlexStart;
    static FlexEnd = AlignItemsFlexEnd;
    static Center = AlignItemsCenter;
    static Baseline = AlignItemsBaseline;
    static Stretch = AlignItemsStretch;

    constructor(variant = new AlignItemsStretch()) {
        super("bevy_ui::ui_node::AlignItems", variant);
    }
}

export class AlignSelfAuto extends ReflectableEnumEntry {
    constructor() {
        super("Auto", []);
    }
}

export class AlignSelfFlexStart extends ReflectableEnumEntry {
    constructor() {
        super("FlexStart", []);
    }
}

export class AlignSelfFlexEnd extends ReflectableEnumEntry {
    constructor() {
        super("FlexEnd", []);
    }
}

export class AlignSelfCenter extends ReflectableEnumEntry {
    constructor() {
        super("Center", []);
    }
}

export class AlignSelfBaseline extends ReflectableEnumEntry {
    constructor() {
        super("Baseline", []);
    }
}

export class AlignSelfStretch extends ReflectableEnumEntry {
    constructor() {
        super("Stretch", []);
    }
}

export class AlignSelf extends ReflectableEnum {
    static Auto = (...args) => new AlignSelf(new AlignSelfAuto(...args));
    static FlexStart = (...args) => new AlignSelf(new AlignSelfFlexStart(...args));
    static FlexEnd = (...args) => new AlignSelf(new AlignSelfFlexEnd(...args));
    static Center = (...args) => new AlignSelf(new AlignSelfCenter(...args));
    static Baseline = (...args) => new AlignSelf(new AlignSelfBaseline(...args));
    static Stretch = (...args) => new AlignSelf(new AlignSelfStretch(...args));

    constructor(variant = new AlignSelfAuto()) {
        super("bevy_ui::ui_node::AlignSelf", variant);
    }
}

export class AlignContentFlexStart extends ReflectableEnumEntry {
    constructor() {
        super("FlexStart", []);
    }
}

export class AlignContentFlexEnd extends ReflectableEnumEntry {
    constructor() {
        super("FlexEnd", []);
    }
}

export class AlignContentCenter extends ReflectableEnumEntry {
    constructor() {
        super("Center", []);
    }
}

export class AlignContentStretch extends ReflectableEnumEntry {
    constructor() {
        super("Stretch", []);
    }
}

export class AlignContentSpaceBetween extends ReflectableEnumEntry {
    constructor() {
        super("SpaceBetween", []);
    }
}

export class AlignContentSpaceAround extends ReflectableEnumEntry {
    constructor() {
        super("SpaceAround", []);
    }
}

export class AlignContent extends ReflectableEnum {
    static FlexStart = AlignContentFlexStart;
    static FlexEnd = AlignContentFlexEnd;
    static Center = AlignContentCenter;
    static Stretch = AlignContentStretch;
    static SpaceBetween = AlignContentSpaceBetween;
    static SpaceAround = AlignContentSpaceAround;

    constructor(variant = new AlignContentStretch()) {
        super("bevy_ui::ui_node::AlignContent", variant);
    }
}

export class DirectionInherit extends ReflectableEnumEntry {
    constructor() {
        super("Inherit", []);
    }
}

export class DirectionLeftToRight extends ReflectableEnumEntry {
    constructor() {
        super("LeftToRight", []);
    }
}

export class DirectionRightToLeft extends ReflectableEnumEntry {
    constructor() {
        super("RightToLeft", []);
    }
}

export class Direction extends ReflectableEnum {
    static Inherit = DirectionInherit;
    static LeftToRight = DirectionLeftToRight;
    static RightToLeft = DirectionRightToLeft;

    constructor(variant = new DirectionInherit()) {
        super("bevy_ui::ui_node::Direction", variant);
    }
}

export class DisplayFlex extends ReflectableEnumEntry {
    constructor() {
        super("Flex", []);
    }
}

export class DisplayNone extends ReflectableEnumEntry {
    constructor() {
        super("None", []);
    }
}

export class Display extends ReflectableEnum {
    static Flex = DisplayFlex;
    static None = DisplayNone;

    constructor(variant = new DisplayFlex()) {
        super("bevy_ui::ui_node::Display", variant);
    }
}

export class FlexDirectionRow extends ReflectableEnumEntry {
    constructor() {
        super("Row", []);
    }
}

export class FlexDirectionColumn extends ReflectableEnumEntry {
    constructor() {
        super("Column", []);
    }
}

export class FlexDirectionRowReverse extends ReflectableEnumEntry {
    constructor() {
        super("RowReverse", []);
    }
}

export class FlexDirectionColumnReverse extends ReflectableEnumEntry {
    constructor() {
        super("ColumnReverse", []);
    }
}

export class FlexDirection extends ReflectableEnum {
    static Row = FlexDirectionRow;
    static Column = FlexDirectionColumn;
    static RowReverse = FlexDirectionRowReverse;
    static ColumnReverse = FlexDirectionColumnReverse;

    constructor(variant = new FlexDirectionRow()) {
        super("bevy_ui::ui_node::FlexDirection", variant);
    }
}

export class JustifyContentFlexStart extends ReflectableEnumEntry {
    constructor() {
        super("FlexStart", []);
    }
}

export class JustifyContentFlexEnd extends ReflectableEnumEntry {
    constructor() {
        super("FlexEnd", []);
    }
}

export class JustifyContentCenter extends ReflectableEnumEntry {
    constructor() {
        super("Center", []);
    }
}

export class JustifyContentSpaceBetween extends ReflectableEnumEntry {
    constructor() {
        super("SpaceBetween", []);
    }
}

export class JustifyContentSpaceAround extends ReflectableEnumEntry {
    constructor() {
        super("SpaceAround", []);
    }
}

export class JustifyContentSpaceEvenly extends ReflectableEnumEntry {
    constructor() {
        super("SpaceEvenly", []);
    }
}

export class JustifyContent extends ReflectableEnum {
    static FlexStart = JustifyContentFlexStart;
    static FlexEnd = JustifyContentFlexEnd;
    static Center = JustifyContentCenter;
    static SpaceBetween = JustifyContentSpaceBetween;
    static SpaceAround = JustifyContentSpaceAround;
    static SpaceEvenly = JustifyContentSpaceEvenly;

    constructor(variant = new JustifyContentFlexStart()) {
        super("bevy_ui::ui_node::JustifyContent", variant);
    }
}

export class OverflowVisible extends ReflectableEnumEntry {
    constructor() {
        super("Visible", []);
    }
}

export class OverflowHidden extends ReflectableEnumEntry {
    constructor() {
        super("Hidden", []);
    }
}

export class Overflow extends ReflectableEnum {
    static Visible = OverflowVisible;
    static Hidden = OverflowHidden;

    constructor(variant = new OverflowVisible()) {
        super("bevy_ui::ui_node::Overflow", variant);
    }
}

export class PositionTypeRelative extends ReflectableEnumEntry {
    constructor() {
        super("Relative", []);
    }
}

export class PositionTypeAbsolute extends ReflectableEnumEntry {
    constructor() {
        super("Absolute", []);
    }
}

export class PositionType extends ReflectableEnum {
    static Relative = (...args) => new PositionType(new PositionTypeRelative(...args));
    static Absolute = (...args) => new PositionType(new PositionTypeAbsolute(...args));;

    constructor(variant = new PositionTypeRelative()) {
        super("bevy_ui::ui_node::PositionType", variant);
    }
}

export class Percent extends ReflectableTupleStruct {
    constructor(seq) {
        super(
            "bevy_ui::ui_node::Val::Percent",
            [
                0.0
            ],
            seq
        )
    }
}

export class FlexWrapNoWrap extends ReflectableEnumEntry {
    constructor() {
        super("NoWrap", []);
    }
}

export class FlexWrapWrap extends ReflectableEnumEntry {
    constructor() {
        super("Wrap", []);
    }
}

export class FlexWrapWrapReverse extends ReflectableEnumEntry {
    constructor() {
        super("WrapReverse", []);
    }
}

export class FlexWrap extends ReflectableEnum {
    static NoWrap = FlexWrapNoWrap;
    static Wrap = FlexWrapWrap;
    static WrapReverse = FlexWrapWrapReverse;

    constructor(variant = new FlexWrapNoWrap()) {
        super("bevy_ui::ui_node::FlexWrap", variant);
    }
}

export class CalculatedSize extends ReflectableStruct {
    constructor(struct) {
        super(
            "bevy_ui::ui_node::CalculatedSize",
            {
                size: new Size(0)
            },
            struct
        )

        Deno.core.print(JSON.stringify(this));
    }
}