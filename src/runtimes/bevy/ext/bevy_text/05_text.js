"use strict";
((window) => {
  const { Vec } = window.alloc.vec;
  const {
    Reflect,
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    waitForWorld,
    worldResourceId,
  } = window.bevyEcs;
  class HorizontalAlignLeft extends ReflectableUnit {
    static typeName = "bevy_text::text::HorizontalAlign";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Left");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), HorizontalAlign.prototype)
    ))();
  class HorizontalAlignCenter extends ReflectableUnit {
    static typeName = "bevy_text::text::HorizontalAlign";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Center");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), HorizontalAlign.prototype)
    ))();
  class HorizontalAlignRight extends ReflectableUnit {
    static typeName = "bevy_text::text::HorizontalAlign";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Right");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), HorizontalAlign.prototype)
    ))();
  class HorizontalAlign extends ReflectableEnum {
    static Left = () => new HorizontalAlignLeft();
    static Center = () => new HorizontalAlignCenter();
    static Right = () => new HorizontalAlignRight();
    static typeName = "bevy_text::text::HorizontalAlign";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), HorizontalAlign.prototype)
    ))();

  class Text extends ReflectableObject {
    static typeName = "bevy_text::text::Text";
    static typeId = new Uint8Array(8);
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
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Text.prototype)
    ))();

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
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), TextAlignment.prototype)
    ))();

  class TextSection extends ReflectableObject {
    static typeName = "bevy_text::text::TextSection";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), TextSection.prototype)
    ))();

  class TextStyle extends ReflectableObject {
    static typeName = "bevy_text::text::TextStyle";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), TextStyle.prototype)
    ))();

  class VerticalAlignTop extends ReflectableUnit {
    static typeName = "bevy_text::text::VerticalAlign";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Top");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), VerticalAlign.prototype)
    ))();
  class VerticalAlignCenter extends ReflectableUnit {
    static typeName = "bevy_text::text::VerticalAlign";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Center");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), VerticalAlign.prototype)
    ))();
  class VerticalAlignBottom extends ReflectableUnit {
    static typeName = "bevy_text::text::VerticalAlign";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Bottom");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), VerticalAlign.prototype)
    ))();
  class VerticalAlign extends ReflectableEnum {
    static Top = () => new VerticalAlignTop();
    static Center = () => new VerticalAlignCenter();
    static Bottom = () => new VerticalAlignBottom();
    static typeName = "bevy_text::text::VerticalAlign";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), VerticalAlign.prototype)
    ))();

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
