"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class Msaa extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_render::view::Msaa";
    }
  }
  if (!window.hasOwnProperty("bevyRender")) {
    window.bevyRender = {};
  }
  if (!window.bevyRender.hasOwnProperty("view")) {
    window.bevyRender.view = {};
  }
  Object.assign(window.bevyRender.view, { Msaa });
})(globalThis);
