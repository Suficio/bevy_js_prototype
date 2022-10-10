"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Button extends ReflectableObject {
    static typeName = "bevy_ui::widget::button::Button";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(struct) {
      super({}, struct);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("ui")) {
    window.Bevy.ui = {};
  }
  if (!window.Bevy.ui.hasOwnProperty("widget")) {
    window.Bevy.ui.widget = {};
  }
  if (!window.Bevy.ui.widget.hasOwnProperty("button")) {
    window.Bevy.ui.widget.button = {};
  }

  Object.assign(window.Bevy.ui.widget.button, { Button });
})(globalThis);
