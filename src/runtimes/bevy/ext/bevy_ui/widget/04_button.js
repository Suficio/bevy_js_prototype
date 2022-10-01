"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Button extends ReflectableObject {
    static typeName = "bevy_ui::widget::button::Button";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({}, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Button.prototype)
    ))();

  if (!window.hasOwnProperty("bevyUi")) {
    window.bevyUi = {};
  }
  if (!window.bevyUi.hasOwnProperty("widget")) {
    window.bevyUi.widget = {};
  }
  if (!window.bevyUi.widget.hasOwnProperty("button")) {
    window.bevyUi.widget.button = {};
  }
  Object.assign(window.bevyUi.widget.button, { Button });
})(globalThis);
