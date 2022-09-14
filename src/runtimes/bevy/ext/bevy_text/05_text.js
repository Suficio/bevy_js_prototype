"use strict";
((window) => {
  const { Vec } = window.alloc.vec;
  const { ReflectableEnum, ReflectableObject, ReflectableUnit } =
    window.bevyEcs;
  class HorizontalAlignLeft extends ReflectableUnit {
    constructor() {
      super("Left");
    }
    static typeName() {
      return "bevy_text::text::HorizontalAlign";
    }
  }
  class HorizontalAlignCenter extends ReflectableUnit {
    constructor() {
      super("Center");
    }
    static typeName() {
      return "bevy_text::text::HorizontalAlign";
    }
  }
  class HorizontalAlignRight extends ReflectableUnit {
    constructor() {
      super("Right");
    }
    static typeName() {
      return "bevy_text::text::HorizontalAlign";
    }
  }
  class HorizontalAlign extends ReflectableEnum {
    static Left = () => new HorizontalAlignLeft();
    static Center = () => new HorizontalAlignCenter();
    static Right = () => new HorizontalAlignRight();
    constructor(type, value) {
      super(type, value);
    }
    static typeName() {
      return "bevy_text::text::HorizontalAlign";
    }
  }
  class Text extends ReflectableObject {
    static fromSection = (value, style) =>
      new Text({ sections: [new TextSection({ value, style })] });
    static fromSections = (sections) => new Text({ sections });
    constructor(struct) {
      super(
        {
          sections: [],
          alignment: new TextAlignment({
            vertical: VerticalAlign.Top(),
            horizontal: HorizontalAlign.Left(),
          }),
        },
        struct
      );
    }
    static typeName() {
      return "bevy_text::text::Text";
    }
    withAlignment(alignment) {
      this.alignment = alignment;
      return this;
    }
  }
  class TextAlignment extends ReflectableObject {
    static TopLeft = () =>
      new TextAlignment({
        vertical: VerticalAlign.Top(),
        horizontal: HorizontalAlign.Left(),
      });
    static TopCenter = () =>
      new TextAlignment({
        vertical: VerticalAlign.Top(),
        horizontal: HorizontalAlign.Center(),
      });
    static TopRight = () =>
      new TextAlignment({
        vertical: VerticalAlign.Top(),
        horizontal: HorizontalAlign.Right(),
      });
    static CenterLeft = () =>
      new TextAlignment({
        vertical: VerticalAlign.Center(),
        horizontal: HorizontalAlign.Left(),
      });
    static Center = () =>
      new TextAlignment({
        vertical: VerticalAlign.Center(),
        horizontal: HorizontalAlign.Center(),
      });
    static CenterRight = () =>
      new TextAlignment({
        vertical: VerticalAlign.Center(),
        horizontal: HorizontalAlign.Right(),
      });
    static BottomLeft = () =>
      new TextAlignment({
        vertical: VerticalAlign.Bottom(),
        horizontal: HorizontalAlign.Left(),
      });
    static BottomCenter = () =>
      new TextAlignment({
        vertical: VerticalAlign.Bottom(),
        horizontal: HorizontalAlign.Center(),
      });
    static BottomRight = () =>
      new TextAlignment({
        vertical: VerticalAlign.Bottom(),
        horizontal: HorizontalAlign.Right(),
      });
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_text::text::TextAlignment";
    }
  }
  class TextSection extends ReflectableObject {
    static fromStyle = (style) => new TextSection({ style });
    constructor(struct) {
      super({ value: "", style: new TextStyle() }, struct);
    }
    static typeName() {
      return "bevy_text::text::TextSection";
    }
  }
  class TextStyle extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_text::text::TextStyle";
    }
  }
  class VerticalAlignTop extends ReflectableUnit {
    constructor() {
      super("Top");
    }
    static typeName() {
      return "bevy_text::text::VerticalAlign";
    }
  }
  class VerticalAlignCenter extends ReflectableUnit {
    constructor() {
      super("Center");
    }
    static typeName() {
      return "bevy_text::text::VerticalAlign";
    }
  }
  class VerticalAlignBottom extends ReflectableUnit {
    constructor() {
      super("Bottom");
    }
    static typeName() {
      return "bevy_text::text::VerticalAlign";
    }
  }
  class VerticalAlign extends ReflectableEnum {
    static Top = () => new VerticalAlignTop();
    static Center = () => new VerticalAlignCenter();
    static Bottom = () => new VerticalAlignBottom();
    constructor(type, value) {
      super(type, value);
    }
    static typeName() {
      return "bevy_text::text::VerticalAlign";
    }
  }
  if (!window.hasOwnProperty("bevyText")) {
    window.bevyText = {};
  }
  if (!window.bevyText.hasOwnProperty("text")) {
    window.bevyText.text = {};
  }
  Object.assign(window.bevyText.text, {
    HorizontalAlign,
    Text,
    TextAlignment,
    TextSection,
    TextStyle,
    VerticalAlign,
  });
})(globalThis);
