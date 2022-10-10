"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Size extends ReflectableObject {
    static typeName = "bevy_ui::geometry::Size";
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

  class UiRect extends ReflectableObject {
    static typeName = "bevy_ui::geometry::UiRect";
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
  if (!window.Bevy.hasOwnProperty("ui")) {
    window.Bevy.ui = {};
  }
  if (!window.Bevy.ui.hasOwnProperty("geometry")) {
    window.Bevy.ui.geometry = {};
  }

  Object.assign(window.Bevy.ui.geometry, { Size, UiRect });
})(globalThis);
