"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  class ComputedVisibility extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_render::view::visibility::ComputedVisibility";
    }
  }
  class Visibility extends ReflectableObject {
    constructor(struct) {
      super({ is_visible: true }, struct);
    }
    typeName() {
      return "bevy_render::view::visibility::Visibility";
    }
  }
  class VisibleEntities extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_render::view::visibility::VisibleEntities";
    }
  }
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
