"use strict";
((window) => {
  const {
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    TypeRegistry,
    worldResourceId,
  } = window.bevyEcs;
  class AnchorCenter extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("Center");
    }
  }
  class AnchorBottomLeft extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("BottomLeft");
    }
  }
  class AnchorBottomCenter extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("BottomCenter");
    }
  }
  class AnchorBottomRight extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("BottomRight");
    }
  }
  class AnchorCenterLeft extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("CenterLeft");
    }
  }
  class AnchorCenterRight extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("CenterRight");
    }
  }
  class AnchorTopLeft extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("TopLeft");
    }
  }
  class AnchorTopCenter extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("TopCenter");
    }
  }
  class AnchorTopRight extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("TopRight");
    }
  }
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
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(type, value) {
      super(type, value);
    }
  }

  class Sprite extends ReflectableObject {
    static typeName = "bevy_sprite::sprite::Sprite";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super(null, struct);
    }
  }

  if (!window.hasOwnProperty("bevySprite")) {
    window.bevySprite = {};
  }
  if (!window.bevySprite.hasOwnProperty("sprite")) {
    window.bevySprite.sprite = {};
  }
  Object.assign(window.bevySprite.sprite, { Anchor, Sprite });
})(globalThis);
