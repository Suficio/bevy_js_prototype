"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;
  class Button extends ReflectableObject {
    static typeName = "bevy_ui::widget::button::Button";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super({}, struct);
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
