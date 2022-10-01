"use strict";
((window) => {
  const {
    Reflect,
    ReflectableEnum,
    ReflectableUnit,
    waitForWorld,
    worldResourceId,
  } = window.bevyEcs;
  class FocusPolicyBlock extends ReflectableUnit {
    static typeName = "bevy_ui::focus::FocusPolicy";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Block");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FocusPolicy.prototype)
    ))();
  class FocusPolicyPass extends ReflectableUnit {
    static typeName = "bevy_ui::focus::FocusPolicy";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Pass");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FocusPolicy.prototype)
    ))();
  class FocusPolicy extends ReflectableEnum {
    static Block = () => new FocusPolicyBlock();
    static Pass = () => new FocusPolicyPass();
    static typeName = "bevy_ui::focus::FocusPolicy";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), FocusPolicy.prototype)
    ))();

  class InteractionClicked extends ReflectableUnit {
    static typeName = "bevy_ui::focus::Interaction";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Clicked");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Interaction.prototype)
    ))();
  class InteractionHovered extends ReflectableUnit {
    static typeName = "bevy_ui::focus::Interaction";
    static typeId = new Uint8Array(8);
    constructor() {
      super("Hovered");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Interaction.prototype)
    ))();
  class InteractionNone extends ReflectableUnit {
    static typeName = "bevy_ui::focus::Interaction";
    static typeId = new Uint8Array(8);
    constructor() {
      super("None");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Interaction.prototype)
    ))();
  class Interaction extends ReflectableEnum {
    static Clicked = () => new InteractionClicked();
    static Hovered = () => new InteractionHovered();
    static None = () => new InteractionNone();
    static typeName = "bevy_ui::focus::Interaction";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Interaction.prototype)
    ))();

  if (!window.hasOwnProperty("bevyUi")) {
    window.bevyUi = {};
  }
  if (!window.bevyUi.hasOwnProperty("focus")) {
    window.bevyUi.focus = {};
  }
  Object.assign(window.bevyUi.focus, { FocusPolicy, Interaction });
})(globalThis);
