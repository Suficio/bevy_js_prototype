"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class Size extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_ui::geometry::Size";
    }
  }
  class UiRect extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_ui::geometry::UiRect";
    }
  }
  if (!window.hasOwnProperty("bevyUi")) {
    window.bevyUi = {};
  }
  if (!window.bevyUi.hasOwnProperty("geometry")) {
    window.bevyUi.geometry = {};
  }
  Object.assign(window.bevyUi.geometry, { Size, UiRect });
})(globalThis);
