"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class Button extends ReflectableObject {
    constructor(struct) {
      super({}, struct);
    }
    static typeName() {
      return "bevy_ui::widget::button::Button";
    }
  }
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
