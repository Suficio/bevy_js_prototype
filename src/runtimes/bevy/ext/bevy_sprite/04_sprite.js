"use strict";
((window) => {
  const {
    ReflectableEnum,
    ReflectableObject,
    ReflectableUnit,
    TypeRegistry,
    worldResourceId,
  } = window.Bevy.ecs;

  class AnchorCenter extends ReflectableUnit {
    static typeName = "bevy_sprite::sprite::Anchor";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
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
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(struct) {
      super(null, struct);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("sprite")) {
    window.Bevy.sprite = {};
  }
  if (!window.Bevy.sprite.hasOwnProperty("sprite")) {
    window.Bevy.sprite.sprite = {};
  }

  Object.assign(window.Bevy.sprite.sprite, { Anchor, Sprite });
})(globalThis);
