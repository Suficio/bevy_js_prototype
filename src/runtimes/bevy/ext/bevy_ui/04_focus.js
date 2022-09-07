"use strict";
((window) => {
  const { ReflectableEnum, ReflectableUnit } = window.bevyEcs.reflect;
  class FocusPolicyBlock extends ReflectableUnit {
    constructor() {
      super("Block");
    }
    typeName() {
      return "bevy_ui::focus::FocusPolicy";
    }
  }
  class FocusPolicyPass extends ReflectableUnit {
    constructor() {
      super("Pass");
    }
    typeName() {
      return "bevy_ui::focus::FocusPolicy";
    }
  }
  class FocusPolicy extends ReflectableEnum {
    static Block = () => new FocusPolicyBlock();
    static Pass = () => new FocusPolicyPass();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::focus::FocusPolicy";
    }
  }
  class InteractionClicked extends ReflectableUnit {
    constructor() {
      super("Clicked");
    }
    typeName() {
      return "bevy_ui::focus::Interaction";
    }
  }
  class InteractionHovered extends ReflectableUnit {
    constructor() {
      super("Hovered");
    }
    typeName() {
      return "bevy_ui::focus::Interaction";
    }
  }
  class InteractionNone extends ReflectableUnit {
    constructor() {
      super("None");
    }
    typeName() {
      return "bevy_ui::focus::Interaction";
    }
  }
  class Interaction extends ReflectableEnum {
    static Clicked = () => new InteractionClicked();
    static Hovered = () => new InteractionHovered();
    static None = () => new InteractionNone();
    constructor(type, value) {
      super(type, value);
    }
    typeName() {
      return "bevy_ui::focus::Interaction";
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
