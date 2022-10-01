"use strict";
((window) => {
  const { Handle } = window.bevyAsset.handle;
  const {
    Reflect,
    ReflectableArray,
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    waitForWorld,
    worldResourceId,
  } = window.bevyEcs;
  const { Color } = window.bevyRender.color;
  const { Size, UiRect } = window.bevyUi.geometry;
  const { Option } = window.core.option;
  const { Vec2 } = window.glam.f32.vec2;
  class AlignContentFlexStart extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("FlexStart");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignContent.prototype)
    ))();
  class AlignContentFlexEnd extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("FlexEnd");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignContent.prototype)
    ))();
  class AlignContentCenter extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Center");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignContent.prototype)
    ))();
  class AlignContentStretch extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Stretch");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignContent.prototype)
    ))();
  class AlignContentSpaceBetween extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("SpaceBetween");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignContent.prototype)
    ))();
  class AlignContentSpaceAround extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("SpaceAround");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignContent.prototype)
    ))();
  class AlignContent extends ReflectableEnum {
    static FlexStart = () => new AlignContentFlexStart();
    static FlexEnd = () => new AlignContentFlexEnd();
    static Center = () => new AlignContentCenter();
    static Stretch = () => new AlignContentStretch();
    static SpaceBetween = () => new AlignContentSpaceBetween();
    static SpaceAround = () => new AlignContentSpaceAround();
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignContent.prototype)
    ))();

  class AlignItemsFlexStart extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = new Uint8Array(8);
    constructor() {
      super("FlexStart");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignItems.prototype)
    ))();
  class AlignItemsFlexEnd extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = new Uint8Array(8);
    constructor() {
      super("FlexEnd");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignItems.prototype)
    ))();
  class AlignItemsCenter extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Center");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignItems.prototype)
    ))();
  class AlignItemsBaseline extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Baseline");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignItems.prototype)
    ))();
  class AlignItemsStretch extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Stretch");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignItems.prototype)
    ))();
  class AlignItems extends ReflectableEnum {
    static FlexStart = () => new AlignItemsFlexStart();
    static FlexEnd = () => new AlignItemsFlexEnd();
    static Center = () => new AlignItemsCenter();
    static Baseline = () => new AlignItemsBaseline();
    static Stretch = () => new AlignItemsStretch();
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignItems.prototype)
    ))();

  class AlignSelfAuto extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Auto");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignSelf.prototype)
    ))();
  class AlignSelfFlexStart extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = new Uint8Array(8);
    constructor() {
      super("FlexStart");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignSelf.prototype)
    ))();
  class AlignSelfFlexEnd extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = new Uint8Array(8);
    constructor() {
      super("FlexEnd");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignSelf.prototype)
    ))();
  class AlignSelfCenter extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Center");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignSelf.prototype)
    ))();
  class AlignSelfBaseline extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Baseline");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignSelf.prototype)
    ))();
  class AlignSelfStretch extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Stretch");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignSelf.prototype)
    ))();
  class AlignSelf extends ReflectableEnum {
    static Auto = () => new AlignSelfAuto();
    static FlexStart = () => new AlignSelfFlexStart();
    static FlexEnd = () => new AlignSelfFlexEnd();
    static Center = () => new AlignSelfCenter();
    static Baseline = () => new AlignSelfBaseline();
    static Stretch = () => new AlignSelfStretch();
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AlignSelf.prototype)
    ))();

  class BackgroundColor extends ReflectableArray {
    static typeName = "bevy_ui::ui_node::BackgroundColor";
    static typeId = new Uint8Array(8);
    constructor(seq) {
      super([Color.Rgba({ red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0 })], seq);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), BackgroundColor.prototype)
    ))();

  class CalculatedSize extends ReflectableObject {
    static typeName = "bevy_ui::ui_node::CalculatedSize";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), CalculatedSize.prototype)
    ))();

  class DirectionInherit extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Direction";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Inherit");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Direction.prototype)
    ))();
  class DirectionLeftToRight extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Direction";
    static typeId = new Uint8Array(8);
    constructor() {
      super("LeftToRight");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Direction.prototype)
    ))();
  class DirectionRightToLeft extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Direction";
    static typeId = new Uint8Array(8);
    constructor() {
      super("RightToLeft");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Direction.prototype)
    ))();
  class Direction extends ReflectableEnum {
    static Inherit = () => new DirectionInherit();
    static LeftToRight = () => new DirectionLeftToRight();
    static RightToLeft = () => new DirectionRightToLeft();
    static typeName = "bevy_ui::ui_node::Direction";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Direction.prototype)
    ))();

  class DisplayFlex extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Display";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Flex");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Display.prototype)
    ))();
  class DisplayNone extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Display";
    static typeId = new Uint8Array(8);
    constructor() {
      super("None");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Display.prototype)
    ))();
  class Display extends ReflectableEnum {
    static Flex = () => new DisplayFlex();
    static None = () => new DisplayNone();
    static typeName = "bevy_ui::ui_node::Display";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Display.prototype)
    ))();

  class FlexDirectionRow extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexDirection";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Row");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FlexDirection.prototype)
    ))();
  class FlexDirectionColumn extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexDirection";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Column");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FlexDirection.prototype)
    ))();
  class FlexDirectionRowReverse extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexDirection";
    static typeId = new Uint8Array(8);
    constructor() {
      super("RowReverse");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FlexDirection.prototype)
    ))();
  class FlexDirectionColumnReverse extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexDirection";
    static typeId = new Uint8Array(8);
    constructor() {
      super("ColumnReverse");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FlexDirection.prototype)
    ))();
  class FlexDirection extends ReflectableEnum {
    static Row = () => new FlexDirectionRow();
    static Column = () => new FlexDirectionColumn();
    static RowReverse = () => new FlexDirectionRowReverse();
    static ColumnReverse = () => new FlexDirectionColumnReverse();
    static typeName = "bevy_ui::ui_node::FlexDirection";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FlexDirection.prototype)
    ))();

  class FlexWrapNoWrap extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexWrap";
    static typeId = new Uint8Array(8);
    constructor() {
      super("NoWrap");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FlexWrap.prototype)
    ))();
  class FlexWrapWrap extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexWrap";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Wrap");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FlexWrap.prototype)
    ))();
  class FlexWrapWrapReverse extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexWrap";
    static typeId = new Uint8Array(8);
    constructor() {
      super("WrapReverse");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FlexWrap.prototype)
    ))();
  class FlexWrap extends ReflectableEnum {
    static NoWrap = () => new FlexWrapNoWrap();
    static Wrap = () => new FlexWrapWrap();
    static WrapReverse = () => new FlexWrapWrapReverse();
    static typeName = "bevy_ui::ui_node::FlexWrap";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FlexWrap.prototype)
    ))();

  class JustifyContentFlexStart extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("FlexStart");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), JustifyContent.prototype)
    ))();
  class JustifyContentFlexEnd extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("FlexEnd");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), JustifyContent.prototype)
    ))();
  class JustifyContentCenter extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Center");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), JustifyContent.prototype)
    ))();
  class JustifyContentSpaceBetween extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("SpaceBetween");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), JustifyContent.prototype)
    ))();
  class JustifyContentSpaceAround extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("SpaceAround");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), JustifyContent.prototype)
    ))();
  class JustifyContentSpaceEvenly extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = new Uint8Array(8);
    constructor() {
      super("SpaceEvenly");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), JustifyContent.prototype)
    ))();
  class JustifyContent extends ReflectableEnum {
    static FlexStart = () => new JustifyContentFlexStart();
    static FlexEnd = () => new JustifyContentFlexEnd();
    static Center = () => new JustifyContentCenter();
    static SpaceBetween = () => new JustifyContentSpaceBetween();
    static SpaceAround = () => new JustifyContentSpaceAround();
    static SpaceEvenly = () => new JustifyContentSpaceEvenly();
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), JustifyContent.prototype)
    ))();

  class Node extends ReflectableObject {
    static typeName = "bevy_ui::ui_node::Node";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ size: new Vec2({ x: 0.0, y: 0.0 }) }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Node.prototype)
    ))();

  class OverflowVisible extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Overflow";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Visible");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Overflow.prototype)
    ))();
  class OverflowHidden extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Overflow";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Hidden");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Overflow.prototype)
    ))();
  class Overflow extends ReflectableEnum {
    static Visible = () => new OverflowVisible();
    static Hidden = () => new OverflowHidden();
    static typeName = "bevy_ui::ui_node::Overflow";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Overflow.prototype)
    ))();

  class PositionTypeRelative extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::PositionType";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Relative");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), PositionType.prototype)
    ))();
  class PositionTypeAbsolute extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::PositionType";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Absolute");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), PositionType.prototype)
    ))();
  class PositionType extends ReflectableEnum {
    static Relative = () => new PositionTypeRelative();
    static Absolute = () => new PositionTypeAbsolute();
    static typeName = "bevy_ui::ui_node::PositionType";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), PositionType.prototype)
    ))();

  class Style extends ReflectableObject {
    static typeName = "bevy_ui::ui_node::Style";
    static typeId = new Uint8Array(8);
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
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Style.prototype)
    ))();

  class UiImage extends ReflectableArray {
    static typeName = "bevy_ui::ui_node::UiImage";
    static typeId = new Uint8Array(8);
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
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), UiImage.prototype)
    ))();

  class ValUndefined extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Val";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Undefined");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Val.prototype)
    ))();
  class ValAuto extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Val";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Auto");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Val.prototype)
    ))();
  class Val extends ReflectableEnum {
    static Undefined = () => new ValUndefined();
    static Auto = () => new ValAuto();
    static Px = (value) => new Val("Px", value);
    static Percent = (value) => new Val("Percent", value);
    static typeName = "bevy_ui::ui_node::Val";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Val.prototype)
    ))();

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
    BackgroundColor,
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
    UiImage,
    Val,
  });
})(globalThis);
