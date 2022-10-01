"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Size extends ReflectableObject {
    static typeName = "bevy_ui::geometry::Size";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Size.prototype)
    ))();

  class UiRect extends ReflectableObject {
    static typeName = "bevy_ui::geometry::UiRect";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), UiRect.prototype)
    ))();

  if (!window.hasOwnProperty("bevyUi")) {
    window.bevyUi = {};
  }
  if (!window.bevyUi.hasOwnProperty("geometry")) {
    window.bevyUi.geometry = {};
  }
  Object.assign(window.bevyUi.geometry, { Size, UiRect });
})(globalThis);
