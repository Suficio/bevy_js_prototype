"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class ComputedVisibility extends ReflectableObject {
    static typeName = "bevy_render::view::visibility::ComputedVisibility";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(
        {
          is_visible_in_hierarchy: false,
          is_visible_in_view: false,
        },
        struct
      );
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ComputedVisibility.prototype)
    ))();

  class Visibility extends ReflectableObject {
    static typeName = "bevy_render::view::visibility::Visibility";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super({ is_visible: true }, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Visibility.prototype)
    ))();

  class VisibleEntities extends ReflectableObject {
    static typeName = "bevy_render::view::visibility::VisibleEntities";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), VisibleEntities.prototype)
    ))();

  if (!window.hasOwnProperty("bevyRender")) {
    window.bevyRender = {};
  }
  if (!window.bevyRender.hasOwnProperty("view")) {
    window.bevyRender.view = {};
  }
  if (!window.bevyRender.view.hasOwnProperty("visibility")) {
    window.bevyRender.view.visibility = {};
  }
  Object.assign(window.bevyRender.view.visibility, {
    ComputedVisibility,
    Visibility,
    VisibleEntities,
  });
})(globalThis);
