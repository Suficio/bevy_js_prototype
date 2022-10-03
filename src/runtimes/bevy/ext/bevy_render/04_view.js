"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;
  class Msaa extends ReflectableObject {
    static typeName = "bevy_render::view::Msaa";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super(null, struct);
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
