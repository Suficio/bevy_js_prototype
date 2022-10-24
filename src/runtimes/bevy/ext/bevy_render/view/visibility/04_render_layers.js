"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class RenderLayers extends ReflectableArray {
    static typeName =
      "bevy_render::view::visibility::render_layers::RenderLayers";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(seq) {
      super([1], seq);
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
  if (!window.Bevy.render.view.hasOwnProperty("visibility")) {
    window.Bevy.render.view.visibility = {};
  }
  if (!window.Bevy.render.view.visibility.hasOwnProperty("renderLayers")) {
    window.Bevy.render.view.visibility.renderLayers = {};
  }

  Object.assign(window.Bevy.render.view.visibility.renderLayers, {
    RenderLayers,
  });
})(globalThis);
