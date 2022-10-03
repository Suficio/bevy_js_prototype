"use strict";
((window) => {
  const { ReflectableEnum, ReflectableUnit, TypeRegistry, worldResourceId } =
    window.bevyEcs;
  class FocusPolicyBlock extends ReflectableUnit {
    static typeName = "bevy_ui::focus::FocusPolicy";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("Block");
    }
  }
  class FocusPolicyPass extends ReflectableUnit {
    static typeName = "bevy_ui::focus::FocusPolicy";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("Pass");
    }
  }
  class FocusPolicy extends ReflectableEnum {
    static Block = () => new FocusPolicyBlock();
    static Pass = () => new FocusPolicyPass();
    static typeName = "bevy_ui::focus::FocusPolicy";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(type, value) {
      super(type, value);
    }
  }

  class InteractionClicked extends ReflectableUnit {
    static typeName = "bevy_ui::focus::Interaction";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("Clicked");
    }
  }
  class InteractionHovered extends ReflectableUnit {
    static typeName = "bevy_ui::focus::Interaction";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("Hovered");
    }
  }
  class InteractionNone extends ReflectableUnit {
    static typeName = "bevy_ui::focus::Interaction";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor() {
      super("None");
    }
  }
  class Interaction extends ReflectableEnum {
    static Clicked = () => new InteractionClicked();
    static Hovered = () => new InteractionHovered();
    static None = () => new InteractionNone();
    static typeName = "bevy_ui::focus::Interaction";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(type, value) {
      super(type, value);
    }
  }

  if (!window.hasOwnProperty("bevyUi")) {
    window.bevyUi = {};
  }
  if (!window.bevyUi.hasOwnProperty("focus")) {
    window.bevyUi.focus = {};
  }
  Object.assign(window.bevyUi.focus, { FocusPolicy, Interaction });
})(globalThis);
