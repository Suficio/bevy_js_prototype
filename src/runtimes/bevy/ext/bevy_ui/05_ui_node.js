"use strict";
((window) => {
  const { Handle } = window.Bevy.asset.handle;
  const {
    ReflectableArray,
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    TypeRegistry,
    worldResourceId,
  } = window.Bevy.ecs;
  const { Color } = window.Bevy.render.color;
  const { Size, UiRect } = window.Bevy.ui.geometry;
  const { Option } = window.core.option;
  const { Vec2 } = window.glam.f32.vec2;

  class AlignContentFlexStart extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("FlexStart");
    }
  }
  class AlignContentFlexEnd extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("FlexEnd");
    }
  }
  class AlignContentCenter extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Center");
    }
  }
  class AlignContentStretch extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Stretch");
    }
  }
  class AlignContentSpaceBetween extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("SpaceBetween");
    }
  }
  class AlignContentSpaceAround extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("SpaceAround");
    }
  }
  class AlignContent extends ReflectableEnum {
    static FlexStart = () => new AlignContentFlexStart();
    static FlexEnd = () => new AlignContentFlexEnd();
    static Center = () => new AlignContentCenter();
    static Stretch = () => new AlignContentStretch();
    static SpaceBetween = () => new AlignContentSpaceBetween();
    static SpaceAround = () => new AlignContentSpaceAround();

    static typeName = "bevy_ui::ui_node::AlignContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class AlignItemsFlexStart extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("FlexStart");
    }
  }
  class AlignItemsFlexEnd extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("FlexEnd");
    }
  }
  class AlignItemsCenter extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Center");
    }
  }
  class AlignItemsBaseline extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Baseline");
    }
  }
  class AlignItemsStretch extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Stretch");
    }
  }
  class AlignItems extends ReflectableEnum {
    static FlexStart = () => new AlignItemsFlexStart();
    static FlexEnd = () => new AlignItemsFlexEnd();
    static Center = () => new AlignItemsCenter();
    static Baseline = () => new AlignItemsBaseline();
    static Stretch = () => new AlignItemsStretch();

    static typeName = "bevy_ui::ui_node::AlignItems";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class AlignSelfAuto extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Auto");
    }
  }
  class AlignSelfFlexStart extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("FlexStart");
    }
  }
  class AlignSelfFlexEnd extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("FlexEnd");
    }
  }
  class AlignSelfCenter extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Center");
    }
  }
  class AlignSelfBaseline extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Baseline");
    }
  }
  class AlignSelfStretch extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Stretch");
    }
  }
  class AlignSelf extends ReflectableEnum {
    static Auto = () => new AlignSelfAuto();
    static FlexStart = () => new AlignSelfFlexStart();
    static FlexEnd = () => new AlignSelfFlexEnd();
    static Center = () => new AlignSelfCenter();
    static Baseline = () => new AlignSelfBaseline();
    static Stretch = () => new AlignSelfStretch();

    static typeName = "bevy_ui::ui_node::AlignSelf";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class BackgroundColor extends ReflectableArray {
    static typeName = "bevy_ui::ui_node::BackgroundColor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(seq) {
      super([Color.Rgba({ red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0 })], seq);
    }
  }

  class CalculatedSize extends ReflectableObject {
    static typeName = "bevy_ui::ui_node::CalculatedSize";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  class DirectionInherit extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Direction";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Inherit");
    }
  }
  class DirectionLeftToRight extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Direction";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("LeftToRight");
    }
  }
  class DirectionRightToLeft extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Direction";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("RightToLeft");
    }
  }
  class Direction extends ReflectableEnum {
    static Inherit = () => new DirectionInherit();
    static LeftToRight = () => new DirectionLeftToRight();
    static RightToLeft = () => new DirectionRightToLeft();

    static typeName = "bevy_ui::ui_node::Direction";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class DisplayFlex extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Display";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Flex");
    }
  }
  class DisplayNone extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Display";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("None");
    }
  }
  class Display extends ReflectableEnum {
    static Flex = () => new DisplayFlex();
    static None = () => new DisplayNone();

    static typeName = "bevy_ui::ui_node::Display";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class FlexDirectionRow extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexDirection";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Row");
    }
  }
  class FlexDirectionColumn extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexDirection";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Column");
    }
  }
  class FlexDirectionRowReverse extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexDirection";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("RowReverse");
    }
  }
  class FlexDirectionColumnReverse extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexDirection";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("ColumnReverse");
    }
  }
  class FlexDirection extends ReflectableEnum {
    static Row = () => new FlexDirectionRow();
    static Column = () => new FlexDirectionColumn();
    static RowReverse = () => new FlexDirectionRowReverse();
    static ColumnReverse = () => new FlexDirectionColumnReverse();

    static typeName = "bevy_ui::ui_node::FlexDirection";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class FlexWrapNoWrap extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexWrap";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("NoWrap");
    }
  }
  class FlexWrapWrap extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexWrap";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Wrap");
    }
  }
  class FlexWrapWrapReverse extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::FlexWrap";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("WrapReverse");
    }
  }
  class FlexWrap extends ReflectableEnum {
    static NoWrap = () => new FlexWrapNoWrap();
    static Wrap = () => new FlexWrapWrap();
    static WrapReverse = () => new FlexWrapWrapReverse();

    static typeName = "bevy_ui::ui_node::FlexWrap";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class JustifyContentFlexStart extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("FlexStart");
    }
  }
  class JustifyContentFlexEnd extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("FlexEnd");
    }
  }
  class JustifyContentCenter extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Center");
    }
  }
  class JustifyContentSpaceBetween extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("SpaceBetween");
    }
  }
  class JustifyContentSpaceAround extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("SpaceAround");
    }
  }
  class JustifyContentSpaceEvenly extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("SpaceEvenly");
    }
  }
  class JustifyContent extends ReflectableEnum {
    static FlexStart = () => new JustifyContentFlexStart();
    static FlexEnd = () => new JustifyContentFlexEnd();
    static Center = () => new JustifyContentCenter();
    static SpaceBetween = () => new JustifyContentSpaceBetween();
    static SpaceAround = () => new JustifyContentSpaceAround();
    static SpaceEvenly = () => new JustifyContentSpaceEvenly();

    static typeName = "bevy_ui::ui_node::JustifyContent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class Node extends ReflectableObject {
    static typeName = "bevy_ui::ui_node::Node";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super({ size: new Vec2({ x: 0.0, y: 0.0 }) }, struct);
    }
  }

  class OverflowVisible extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Overflow";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Visible");
    }
  }
  class OverflowHidden extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Overflow";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Hidden");
    }
  }
  class Overflow extends ReflectableEnum {
    static Visible = () => new OverflowVisible();
    static Hidden = () => new OverflowHidden();

    static typeName = "bevy_ui::ui_node::Overflow";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class PositionTypeRelative extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::PositionType";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Relative");
    }
  }
  class PositionTypeAbsolute extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::PositionType";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Absolute");
    }
  }
  class PositionType extends ReflectableEnum {
    static Relative = () => new PositionTypeRelative();
    static Absolute = () => new PositionTypeAbsolute();

    static typeName = "bevy_ui::ui_node::PositionType";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class Style extends ReflectableObject {
    static typeName = "bevy_ui::ui_node::Style";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

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

  class UiImage extends ReflectableArray {
    static typeName = "bevy_ui::ui_node::UiImage";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

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

  class ValUndefined extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Val";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Undefined");
    }
  }
  class ValAuto extends ReflectableUnit {
    static typeName = "bevy_ui::ui_node::Val";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Auto");
    }
  }
  class Val extends ReflectableEnum {
    static Undefined = () => new ValUndefined();
    static Auto = () => new ValAuto();
    static Px = (value) => new Val("Px", value);
    static Percent = (value) => new Val("Percent", value);

    static typeName = "bevy_ui::ui_node::Val";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("ui")) {
    window.Bevy.ui = {};
  }
  if (!window.Bevy.ui.hasOwnProperty("uiNode")) {
    window.Bevy.ui.uiNode = {};
  }

  Object.assign(window.Bevy.ui.uiNode, {
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
