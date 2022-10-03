"use strict";
((window) => {
  const { Vec } = window.alloc.vec;
  const {
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    TypeRegistry,
    worldResourceId,
  } = window.bevyEcs;

  class HorizontalAlignLeft extends ReflectableUnit {
    static typeName = "bevy_text::text::HorizontalAlign";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Left");
    }
  }
  class HorizontalAlignCenter extends ReflectableUnit {
    static typeName = "bevy_text::text::HorizontalAlign";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Center");
    }
  }
  class HorizontalAlignRight extends ReflectableUnit {
    static typeName = "bevy_text::text::HorizontalAlign";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Right");
    }
  }
  class HorizontalAlign extends ReflectableEnum {
    static Left = () => new HorizontalAlignLeft();
    static Center = () => new HorizontalAlignCenter();
    static Right = () => new HorizontalAlignRight();

    static typeName = "bevy_text::text::HorizontalAlign";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  class Text extends ReflectableObject {
    static fromSection = (value, style) =>
      new Text({ sections: [new TextSection({ value, style })] });
    static fromSections = (sections) => new Text({ sections });

    static typeName = "bevy_text::text::Text";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

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

    static typeName = "bevy_text::text::TextAlignment";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  class TextSection extends ReflectableObject {
    static fromStyle = (style) => new TextSection({ style });

    static typeName = "bevy_text::text::TextSection";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super({ value: "", style: new TextStyle() }, struct);
    }
  }

  class TextStyle extends ReflectableObject {
    static typeName = "bevy_text::text::TextStyle";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  class VerticalAlignTop extends ReflectableUnit {
    static typeName = "bevy_text::text::VerticalAlign";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Top");
    }
  }
  class VerticalAlignCenter extends ReflectableUnit {
    static typeName = "bevy_text::text::VerticalAlign";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Center");
    }
  }
  class VerticalAlignBottom extends ReflectableUnit {
    static typeName = "bevy_text::text::VerticalAlign";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("Bottom");
    }
  }
  class VerticalAlign extends ReflectableEnum {
    static Top = () => new VerticalAlignTop();
    static Center = () => new VerticalAlignCenter();
    static Bottom = () => new VerticalAlignBottom();

    static typeName = "bevy_text::text::VerticalAlign";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
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
