"use strict";
((window) => {
  const {
    Reflect,
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    waitForWorld,
    worldResourceId,
  } = window.bevyEcs;
  class AnchorCenter extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Center");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Anchor.prototype)
    ))();
  class AnchorBottomLeft extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = new Uint8Array(8);
    constructor() {
      super("BottomLeft");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Anchor.prototype)
    ))();
  class AnchorBottomCenter extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = new Uint8Array(8);
    constructor() {
      super("BottomCenter");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Anchor.prototype)
    ))();
  class AnchorBottomRight extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = new Uint8Array(8);
    constructor() {
      super("BottomRight");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Anchor.prototype)
    ))();
  class AnchorCenterLeft extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = new Uint8Array(8);
    constructor() {
      super("CenterLeft");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Anchor.prototype)
    ))();
  class AnchorCenterRight extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = new Uint8Array(8);
    constructor() {
      super("CenterRight");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Anchor.prototype)
    ))();
  class AnchorTopLeft extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = new Uint8Array(8);
    constructor() {
      super("TopLeft");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Anchor.prototype)
    ))();
  class AnchorTopCenter extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = new Uint8Array(8);
    constructor() {
      super("TopCenter");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Anchor.prototype)
    ))();
  class AnchorTopRight extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = new Uint8Array(8);
    constructor() {
      super("TopRight");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Anchor.prototype)
    ))();
  class Anchor extends ReflectableEnum {
    static Center = () => new AnchorCenter();
    static BottomLeft = () => new AnchorBottomLeft();
    static BottomCenter = () => new AnchorBottomCenter();
    static BottomRight = () => new AnchorBottomRight();
    static CenterLeft = () => new AnchorCenterLeft();
    static CenterRight = () => new AnchorCenterRight();
    static TopLeft = () => new AnchorTopLeft();
    static TopCenter = () => new AnchorTopCenter();
    static TopRight = () => new AnchorTopRight();
    static Custom = (value) => new Anchor("Custom", value);
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Anchor.prototype)
    ))();

  class Sprite extends ReflectableObject {
    static typeName = "bevy_sprite::sprite::Sprite";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Sprite.prototype)
    ))();

  if (!window.hasOwnProperty("bevySprite")) {
    window.bevySprite = {};
  }
  if (!window.bevySprite.hasOwnProperty("sprite")) {
    window.bevySprite.sprite = {};
  }
  Object.assign(window.bevySprite.sprite, { Anchor, Sprite });
})(globalThis);
