"use strict";
import {
    ReflectableArray,
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
} from "./../../bevy.js";
import {
    Handle,
} from "./../asset/handle.js";
import {
    Color,
} from "./../render/color.js";
import {
    Size,
    UiRect,
} from "./geometry.js";
import {
    Option,
} from "./../../core/option.js";
import {
    Vec2,
} from "./../../glam/f32/vec2.js";
export class AlignContentFlexStart extends ReflectableUnit {
    constructor() {
        super("FlexStart")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignContent"
    }
};
export class AlignContentFlexEnd extends ReflectableUnit {
    constructor() {
        super("FlexEnd")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignContent"
    }
};
export class AlignContentCenter extends ReflectableUnit {
    constructor() {
        super("Center")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignContent"
    }
};
export class AlignContentStretch extends ReflectableUnit {
    constructor() {
        super("Stretch")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignContent"
    }
};
export class AlignContentSpaceBetween extends ReflectableUnit {
    constructor() {
        super("SpaceBetween")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignContent"
    }
};
export class AlignContentSpaceAround extends ReflectableUnit {
    constructor() {
        super("SpaceAround")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignContent"
    }
};
export class AlignContent extends ReflectableEnum {
    static FlexStart = () => new AlignContentFlexStart();
    static FlexEnd = () => new AlignContentFlexEnd();
    static Center = () => new AlignContentCenter();
    static Stretch = () => new AlignContentStretch();
    static SpaceBetween = () => new AlignContentSpaceBetween();
    static SpaceAround = () => new AlignContentSpaceAround();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::AlignContent"
    }
}
export class AlignItemsFlexStart extends ReflectableUnit {
    constructor() {
        super("FlexStart")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignItems"
    }
};
export class AlignItemsFlexEnd extends ReflectableUnit {
    constructor() {
        super("FlexEnd")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignItems"
    }
};
export class AlignItemsCenter extends ReflectableUnit {
    constructor() {
        super("Center")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignItems"
    }
};
export class AlignItemsBaseline extends ReflectableUnit {
    constructor() {
        super("Baseline")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignItems"
    }
};
export class AlignItemsStretch extends ReflectableUnit {
    constructor() {
        super("Stretch")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignItems"
    }
};
export class AlignItems extends ReflectableEnum {
    static FlexStart = () => new AlignItemsFlexStart();
    static FlexEnd = () => new AlignItemsFlexEnd();
    static Center = () => new AlignItemsCenter();
    static Baseline = () => new AlignItemsBaseline();
    static Stretch = () => new AlignItemsStretch();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::AlignItems"
    }
}
export class AlignSelfAuto extends ReflectableUnit {
    constructor() {
        super("Auto")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignSelf"
    }
};
export class AlignSelfFlexStart extends ReflectableUnit {
    constructor() {
        super("FlexStart")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignSelf"
    }
};
export class AlignSelfFlexEnd extends ReflectableUnit {
    constructor() {
        super("FlexEnd")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignSelf"
    }
};
export class AlignSelfCenter extends ReflectableUnit {
    constructor() {
        super("Center")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignSelf"
    }
};
export class AlignSelfBaseline extends ReflectableUnit {
    constructor() {
        super("Baseline")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignSelf"
    }
};
export class AlignSelfStretch extends ReflectableUnit {
    constructor() {
        super("Stretch")
    }
    typeName() {
        return "bevy_ui::ui_node::AlignSelf"
    }
};
export class AlignSelf extends ReflectableEnum {
    static Auto = () => new AlignSelfAuto();
    static FlexStart = () => new AlignSelfFlexStart();
    static FlexEnd = () => new AlignSelfFlexEnd();
    static Center = () => new AlignSelfCenter();
    static Baseline = () => new AlignSelfBaseline();
    static Stretch = () => new AlignSelfStretch();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::AlignSelf"
    }
}
export class CalculatedSize extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_ui::ui_node::CalculatedSize"
    }
}
export class DirectionInherit extends ReflectableUnit {
    constructor() {
        super("Inherit")
    }
    typeName() {
        return "bevy_ui::ui_node::Direction"
    }
};
export class DirectionLeftToRight extends ReflectableUnit {
    constructor() {
        super("LeftToRight")
    }
    typeName() {
        return "bevy_ui::ui_node::Direction"
    }
};
export class DirectionRightToLeft extends ReflectableUnit {
    constructor() {
        super("RightToLeft")
    }
    typeName() {
        return "bevy_ui::ui_node::Direction"
    }
};
export class Direction extends ReflectableEnum {
    static Inherit = () => new DirectionInherit();
    static LeftToRight = () => new DirectionLeftToRight();
    static RightToLeft = () => new DirectionRightToLeft();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::Direction"
    }
}
export class DisplayFlex extends ReflectableUnit {
    constructor() {
        super("Flex")
    }
    typeName() {
        return "bevy_ui::ui_node::Display"
    }
};
export class DisplayNone extends ReflectableUnit {
    constructor() {
        super("None")
    }
    typeName() {
        return "bevy_ui::ui_node::Display"
    }
};
export class Display extends ReflectableEnum {
    static Flex = () => new DisplayFlex();
    static None = () => new DisplayNone();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::Display"
    }
}
export class FlexDirectionRow extends ReflectableUnit {
    constructor() {
        super("Row")
    }
    typeName() {
        return "bevy_ui::ui_node::FlexDirection"
    }
};
export class FlexDirectionColumn extends ReflectableUnit {
    constructor() {
        super("Column")
    }
    typeName() {
        return "bevy_ui::ui_node::FlexDirection"
    }
};
export class FlexDirectionRowReverse extends ReflectableUnit {
    constructor() {
        super("RowReverse")
    }
    typeName() {
        return "bevy_ui::ui_node::FlexDirection"
    }
};
export class FlexDirectionColumnReverse extends ReflectableUnit {
    constructor() {
        super("ColumnReverse")
    }
    typeName() {
        return "bevy_ui::ui_node::FlexDirection"
    }
};
export class FlexDirection extends ReflectableEnum {
    static Row = () => new FlexDirectionRow();
    static Column = () => new FlexDirectionColumn();
    static RowReverse = () => new FlexDirectionRowReverse();
    static ColumnReverse = () => new FlexDirectionColumnReverse();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::FlexDirection"
    }
}
export class FlexWrapNoWrap extends ReflectableUnit {
    constructor() {
        super("NoWrap")
    }
    typeName() {
        return "bevy_ui::ui_node::FlexWrap"
    }
};
export class FlexWrapWrap extends ReflectableUnit {
    constructor() {
        super("Wrap")
    }
    typeName() {
        return "bevy_ui::ui_node::FlexWrap"
    }
};
export class FlexWrapWrapReverse extends ReflectableUnit {
    constructor() {
        super("WrapReverse")
    }
    typeName() {
        return "bevy_ui::ui_node::FlexWrap"
    }
};
export class FlexWrap extends ReflectableEnum {
    static NoWrap = () => new FlexWrapNoWrap();
    static Wrap = () => new FlexWrapWrap();
    static WrapReverse = () => new FlexWrapWrapReverse();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::FlexWrap"
    }
}
export class JustifyContentFlexStart extends ReflectableUnit {
    constructor() {
        super("FlexStart")
    }
    typeName() {
        return "bevy_ui::ui_node::JustifyContent"
    }
};
export class JustifyContentFlexEnd extends ReflectableUnit {
    constructor() {
        super("FlexEnd")
    }
    typeName() {
        return "bevy_ui::ui_node::JustifyContent"
    }
};
export class JustifyContentCenter extends ReflectableUnit {
    constructor() {
        super("Center")
    }
    typeName() {
        return "bevy_ui::ui_node::JustifyContent"
    }
};
export class JustifyContentSpaceBetween extends ReflectableUnit {
    constructor() {
        super("SpaceBetween")
    }
    typeName() {
        return "bevy_ui::ui_node::JustifyContent"
    }
};
export class JustifyContentSpaceAround extends ReflectableUnit {
    constructor() {
        super("SpaceAround")
    }
    typeName() {
        return "bevy_ui::ui_node::JustifyContent"
    }
};
export class JustifyContentSpaceEvenly extends ReflectableUnit {
    constructor() {
        super("SpaceEvenly")
    }
    typeName() {
        return "bevy_ui::ui_node::JustifyContent"
    }
};
export class JustifyContent extends ReflectableEnum {
    static FlexStart = () => new JustifyContentFlexStart();
    static FlexEnd = () => new JustifyContentFlexEnd();
    static Center = () => new JustifyContentCenter();
    static SpaceBetween = () => new JustifyContentSpaceBetween();
    static SpaceAround = () => new JustifyContentSpaceAround();
    static SpaceEvenly = () => new JustifyContentSpaceEvenly();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::JustifyContent"
    }
}
export class Node extends ReflectableObject {
    constructor(struct) {
        super({
            size: new Vec2({
                x: 0.0,
                y: 0.0,
            }),
        }, struct)
    }
    typeName() {
        return "bevy_ui::ui_node::Node"
    }
}
export class OverflowVisible extends ReflectableUnit {
    constructor() {
        super("Visible")
    }
    typeName() {
        return "bevy_ui::ui_node::Overflow"
    }
};
export class OverflowHidden extends ReflectableUnit {
    constructor() {
        super("Hidden")
    }
    typeName() {
        return "bevy_ui::ui_node::Overflow"
    }
};
export class Overflow extends ReflectableEnum {
    static Visible = () => new OverflowVisible();
    static Hidden = () => new OverflowHidden();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::Overflow"
    }
}
export class PositionTypeRelative extends ReflectableUnit {
    constructor() {
        super("Relative")
    }
    typeName() {
        return "bevy_ui::ui_node::PositionType"
    }
};
export class PositionTypeAbsolute extends ReflectableUnit {
    constructor() {
        super("Absolute")
    }
    typeName() {
        return "bevy_ui::ui_node::PositionType"
    }
};
export class PositionType extends ReflectableEnum {
    static Relative = () => new PositionTypeRelative();
    static Absolute = () => new PositionTypeAbsolute();
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::PositionType"
    }
}
export class Style extends ReflectableObject {
    constructor(struct) {
        super({
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
    typeName() {
        return "bevy_ui::ui_node::Style"
    }
}
export class UiColor extends ReflectableArray {
    constructor(seq) {
        super([Color.Rgba({
            red: 1.0,
            green: 1.0,
            blue: 1.0,
            alpha: 1.0,
        }), ], seq)
    }
    typeName() {
        return "bevy_ui::ui_node::UiColor"
    }
}
export class UiImage extends ReflectableArray {
    constructor(seq) {
        super([new Handle({
            id: {
                "Id": ["6ea26da6-6cf8-4ea2-9986-1d7bf6c17d6f", 13148262314052771789]
            },
        }), ], seq)
    }
    typeName() {
        return "bevy_ui::ui_node::UiImage"
    }
}
export class ValUndefined extends ReflectableUnit {
    constructor() {
        super("Undefined")
    }
    typeName() {
        return "bevy_ui::ui_node::Val"
    }
};
export class ValAuto extends ReflectableUnit {
    constructor() {
        super("Auto")
    }
    typeName() {
        return "bevy_ui::ui_node::Val"
    }
};
export class Val extends ReflectableEnum {
    static Undefined = () => new ValUndefined();
    static Auto = () => new ValAuto();
    static Px = (value) => new Val("Px", value);
    static Percent = (value) => new Val("Percent", value);
    constructor(type, value) {
        super(type, value)
    }
    typeName() {
        return "bevy_ui::ui_node::Val"
    }
}