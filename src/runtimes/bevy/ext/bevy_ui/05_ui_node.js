"use strict";
((window) => {
  const { Handle } = window.bevyAsset.handle;
  const {
    ReflectableArray,
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
  } = window.bevyEcs.reflect;
  const { Color } = window.bevyRender.color;
  const { Size, UiRect } = window.bevyUi.geometry;
  const { Option } = window.core.option;
  const { Vec2 } = window.glam.f32.vec2;
  class AlignContentFlexStart extends ReflectableUnit {
    constructor() {
      super("FlexStart");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignContent";
    }
  }
  class AlignContentFlexEnd extends ReflectableUnit {
    constructor() {
      super("FlexEnd");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignContent";
    }
  }
  class AlignContentCenter extends ReflectableUnit {
    constructor() {
      super("Center");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignContent";
    }
  }
  class AlignContentStretch extends ReflectableUnit {
    constructor() {
      super("Stretch");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignContent";
    }
  }
  class AlignContentSpaceBetween extends ReflectableUnit {
    constructor() {
      super("SpaceBetween");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignContent";
    }
  }
  class AlignContentSpaceAround extends ReflectableUnit {
    constructor() {
      super("SpaceAround");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignContent";
    }
  }
  class AlignContent extends ReflectableEnum {
    static FlexStart = () => new AlignContentFlexStart();
    static FlexEnd = () => new AlignContentFlexEnd();
    static Center = () => new AlignContentCenter();
    static Stretch = () => new AlignContentStretch();
    static SpaceBetween = () => new AlignContentSpaceBetween();
    static SpaceAround = () => new AlignContentSpaceAround();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::AlignContent";
    }
  }
  class AlignItemsFlexStart extends ReflectableUnit {
    constructor() {
      super("FlexStart");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignItems";
    }
  }
  class AlignItemsFlexEnd extends ReflectableUnit {
    constructor() {
      super("FlexEnd");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignItems";
    }
  }
  class AlignItemsCenter extends ReflectableUnit {
    constructor() {
      super("Center");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignItems";
    }
  }
  class AlignItemsBaseline extends ReflectableUnit {
    constructor() {
      super("Baseline");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignItems";
    }
  }
  class AlignItemsStretch extends ReflectableUnit {
    constructor() {
      super("Stretch");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignItems";
    }
  }
  class AlignItems extends ReflectableEnum {
    static FlexStart = () => new AlignItemsFlexStart();
    static FlexEnd = () => new AlignItemsFlexEnd();
    static Center = () => new AlignItemsCenter();
    static Baseline = () => new AlignItemsBaseline();
    static Stretch = () => new AlignItemsStretch();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::AlignItems";
    }
  }
  class AlignSelfAuto extends ReflectableUnit {
    constructor() {
      super("Auto");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignSelf";
    }
  }
  class AlignSelfFlexStart extends ReflectableUnit {
    constructor() {
      super("FlexStart");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignSelf";
    }
  }
  class AlignSelfFlexEnd extends ReflectableUnit {
    constructor() {
      super("FlexEnd");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignSelf";
    }
  }
  class AlignSelfCenter extends ReflectableUnit {
    constructor() {
      super("Center");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignSelf";
    }
  }
  class AlignSelfBaseline extends ReflectableUnit {
    constructor() {
      super("Baseline");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignSelf";
    }
  }
  class AlignSelfStretch extends ReflectableUnit {
    constructor() {
      super("Stretch");
    }
    typeName() {
      return "bevy_ui::ui_node::AlignSelf";
    }
  }
  class AlignSelf extends ReflectableEnum {
    static Auto = () => new AlignSelfAuto();
    static FlexStart = () => new AlignSelfFlexStart();
    static FlexEnd = () => new AlignSelfFlexEnd();
    static Center = () => new AlignSelfCenter();
    static Baseline = () => new AlignSelfBaseline();
    static Stretch = () => new AlignSelfStretch();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::AlignSelf";
    }
  }
  class CalculatedSize extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_ui::ui_node::CalculatedSize";
    }
  }
  class DirectionInherit extends ReflectableUnit {
    constructor() {
      super("Inherit");
    }
    typeName() {
      return "bevy_ui::ui_node::Direction";
    }
  }
  class DirectionLeftToRight extends ReflectableUnit {
    constructor() {
      super("LeftToRight");
    }
    typeName() {
      return "bevy_ui::ui_node::Direction";
    }
  }
  class DirectionRightToLeft extends ReflectableUnit {
    constructor() {
      super("RightToLeft");
    }
    typeName() {
      return "bevy_ui::ui_node::Direction";
    }
  }
  class Direction extends ReflectableEnum {
    static Inherit = () => new DirectionInherit();
    static LeftToRight = () => new DirectionLeftToRight();
    static RightToLeft = () => new DirectionRightToLeft();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::Direction";
    }
  }
  class DisplayFlex extends ReflectableUnit {
    constructor() {
      super("Flex");
    }
    typeName() {
      return "bevy_ui::ui_node::Display";
    }
  }
  class DisplayNone extends ReflectableUnit {
    constructor() {
      super("None");
    }
    typeName() {
      return "bevy_ui::ui_node::Display";
    }
  }
  class Display extends ReflectableEnum {
    static Flex = () => new DisplayFlex();
    static None = () => new DisplayNone();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::Display";
    }
  }
  class FlexDirectionRow extends ReflectableUnit {
    constructor() {
      super("Row");
    }
    typeName() {
      return "bevy_ui::ui_node::FlexDirection";
    }
  }
  class FlexDirectionColumn extends ReflectableUnit {
    constructor() {
      super("Column");
    }
    typeName() {
      return "bevy_ui::ui_node::FlexDirection";
    }
  }
  class FlexDirectionRowReverse extends ReflectableUnit {
    constructor() {
      super("RowReverse");
    }
    typeName() {
      return "bevy_ui::ui_node::FlexDirection";
    }
  }
  class FlexDirectionColumnReverse extends ReflectableUnit {
    constructor() {
      super("ColumnReverse");
    }
    typeName() {
      return "bevy_ui::ui_node::FlexDirection";
    }
  }
  class FlexDirection extends ReflectableEnum {
    static Row = () => new FlexDirectionRow();
    static Column = () => new FlexDirectionColumn();
    static RowReverse = () => new FlexDirectionRowReverse();
    static ColumnReverse = () => new FlexDirectionColumnReverse();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::FlexDirection";
    }
  }
  class FlexWrapNoWrap extends ReflectableUnit {
    constructor() {
      super("NoWrap");
    }
    typeName() {
      return "bevy_ui::ui_node::FlexWrap";
    }
  }
  class FlexWrapWrap extends ReflectableUnit {
    constructor() {
      super("Wrap");
    }
    typeName() {
      return "bevy_ui::ui_node::FlexWrap";
    }
  }
  class FlexWrapWrapReverse extends ReflectableUnit {
    constructor() {
      super("WrapReverse");
    }
    typeName() {
      return "bevy_ui::ui_node::FlexWrap";
    }
  }
  class FlexWrap extends ReflectableEnum {
    static NoWrap = () => new FlexWrapNoWrap();
    static Wrap = () => new FlexWrapWrap();
    static WrapReverse = () => new FlexWrapWrapReverse();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::FlexWrap";
    }
  }
  class JustifyContentFlexStart extends ReflectableUnit {
    constructor() {
      super("FlexStart");
    }
    typeName() {
      return "bevy_ui::ui_node::JustifyContent";
    }
  }
  class JustifyContentFlexEnd extends ReflectableUnit {
    constructor() {
      super("FlexEnd");
    }
    typeName() {
      return "bevy_ui::ui_node::JustifyContent";
    }
  }
  class JustifyContentCenter extends ReflectableUnit {
    constructor() {
      super("Center");
    }
    typeName() {
      return "bevy_ui::ui_node::JustifyContent";
    }
  }
  class JustifyContentSpaceBetween extends ReflectableUnit {
    constructor() {
      super("SpaceBetween");
    }
    typeName() {
      return "bevy_ui::ui_node::JustifyContent";
    }
  }
  class JustifyContentSpaceAround extends ReflectableUnit {
    constructor() {
      super("SpaceAround");
    }
    typeName() {
      return "bevy_ui::ui_node::JustifyContent";
    }
  }
  class JustifyContentSpaceEvenly extends ReflectableUnit {
    constructor() {
      super("SpaceEvenly");
    }
    typeName() {
      return "bevy_ui::ui_node::JustifyContent";
    }
  }
  class JustifyContent extends ReflectableEnum {
    static FlexStart = () => new JustifyContentFlexStart();
    static FlexEnd = () => new JustifyContentFlexEnd();
    static Center = () => new JustifyContentCenter();
    static SpaceBetween = () => new JustifyContentSpaceBetween();
    static SpaceAround = () => new JustifyContentSpaceAround();
    static SpaceEvenly = () => new JustifyContentSpaceEvenly();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::JustifyContent";
    }
  }
  class Node extends ReflectableObject {
    constructor(struct) {
      super({ size: new Vec2({ x: 0.0, y: 0.0 }) }, struct);
    }
    typeName() {
      return "bevy_ui::ui_node::Node";
    }
  }
  class OverflowVisible extends ReflectableUnit {
    constructor() {
      super("Visible");
    }
    typeName() {
      return "bevy_ui::ui_node::Overflow";
    }
  }
  class OverflowHidden extends ReflectableUnit {
    constructor() {
      super("Hidden");
    }
    typeName() {
      return "bevy_ui::ui_node::Overflow";
    }
  }
  class Overflow extends ReflectableEnum {
    static Visible = () => new OverflowVisible();
    static Hidden = () => new OverflowHidden();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::Overflow";
    }
  }
  class PositionTypeRelative extends ReflectableUnit {
    constructor() {
      super("Relative");
    }
    typeName() {
      return "bevy_ui::ui_node::PositionType";
    }
  }
  class PositionTypeAbsolute extends ReflectableUnit {
    constructor() {
      super("Absolute");
    }
    typeName() {
      return "bevy_ui::ui_node::PositionType";
    }
  }
  class PositionType extends ReflectableEnum {
    static Relative = () => new PositionTypeRelative();
    static Absolute = () => new PositionTypeAbsolute();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::PositionType";
    }
  }
  class Style extends ReflectableObject {
    constructor(struct) {
      super(
        {
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
          size: new Size({ width: Val.Auto(), height: Val.Auto() }),
          min_size: new Size({ width: Val.Auto(), height: Val.Auto() }),
          max_size: new Size({ width: Val.Auto(), height: Val.Auto() }),
          aspect_ratio: Option.None(),
          overflow: Overflow.Visible(),
        },
        struct
      );
    }
    typeName() {
      return "bevy_ui::ui_node::Style";
    }
  }
  class UiColor extends ReflectableArray {
    constructor(seq) {
      super([Color.Rgba({ red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0 })], seq);
    }
    typeName() {
      return "bevy_ui::ui_node::UiColor";
    }
  }
  class UiImage extends ReflectableArray {
    constructor(seq) {
      super(
        [
          new Handle({
            id: {
              Id: [
                "6ea26da6-6cf8-4ea2-9986-1d7bf6c17d6f",
                13148262314052771789,
              ],
            },
          }),
        ],
        seq
      );
    }
    typeName() {
      return "bevy_ui::ui_node::UiImage";
    }
  }
  class ValUndefined extends ReflectableUnit {
    constructor() {
      super("Undefined");
    }
    typeName() {
      return "bevy_ui::ui_node::Val";
    }
  }
  class ValAuto extends ReflectableUnit {
    constructor() {
      super("Auto");
    }
    typeName() {
      return "bevy_ui::ui_node::Val";
    }
  }
  class Val extends ReflectableEnum {
    static Undefined = () => new ValUndefined();
    static Auto = () => new ValAuto();
    static Px = (value) => new Val("Px", value);
    static Percent = (value) => new Val("Percent", value);
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::ui_node::Val";
    }
  }
  if (!window.hasOwnProperty("bevyUi")) {
    window.bevyUi = {};
  }
  if (!window.bevyUi.hasOwnProperty("uiNode")) {
    window.bevyUi.uiNode = {};
  }
  Object.assign(window.bevyUi.uiNode, {
    AlignContent,
    AlignItems,
    AlignSelf,
    CalculatedSize,
    Direction,
    Display,
    FlexDirection,
    FlexWrap,
    JustifyContent,
    Node,
    Overflow,
    PositionType,
    Style,
    UiColor,
    UiImage,
    Val,
  });
})(globalThis);
