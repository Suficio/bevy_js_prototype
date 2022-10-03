"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;
  class Size extends ReflectableObject {
    static typeName = "bevy_ui::geometry::Size";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super(null, struct);
    }
  }

  class UiRect extends ReflectableObject {
    static typeName = "bevy_ui::geometry::UiRect";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super(null, struct);
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
