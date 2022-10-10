"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Msaa extends ReflectableObject {
    static typeName = "bevy_render::view::Msaa";
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
  if (!window.Bevy.hasOwnProperty("render")) {
    window.Bevy.render = {};
  }
  if (!window.Bevy.render.hasOwnProperty("view")) {
    window.Bevy.render.view = {};
  }

  Object.assign(window.Bevy.render.view, { Msaa });
})(globalThis);
