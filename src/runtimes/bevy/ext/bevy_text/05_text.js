"use strict";
((window) => {
  const { Vec } = window.alloc.vec;
  const { ReflectableEnum, ReflectableObject, ReflectableUnit } =
    window.bevyEcs;
  class HorizontalAlignLeft extends ReflectableUnit {
    constructor() {
      super("Left");
    }
    typeName() {
      return "bevy_text::text::HorizontalAlign";
    }
  }
  class HorizontalAlignCenter extends ReflectableUnit {
    constructor() {
      super("Center");
    }
    typeName() {
      return "bevy_text::text::HorizontalAlign";
    }
  }
  class HorizontalAlignRight extends ReflectableUnit {
    constructor() {
      super("Right");
    }
    typeName() {
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
    typeName() {
      return "bevy_text::text::HorizontalAlign";
    }
  }
  class Text extends ReflectableObject {
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
    typeName() {
      return "bevy_text::text::Text";
    }
  }
  class TextAlignment extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_text::text::TextAlignment";
    }
  }
  class TextSection extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_text::text::TextSection";
    }
  }
  class TextStyle extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_text::text::TextStyle";
    }
  }
  class VerticalAlignTop extends ReflectableUnit {
    constructor() {
      super("Top");
    }
    typeName() {
      return "bevy_text::text::VerticalAlign";
    }
  }
  class VerticalAlignCenter extends ReflectableUnit {
    constructor() {
      super("Center");
    }
    typeName() {
      return "bevy_text::text::VerticalAlign";
    }
  }
  class VerticalAlignBottom extends ReflectableUnit {
    constructor() {
      super("Bottom");
    }
    typeName() {
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
    typeName() {
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
