"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class ComputedVisibility extends ReflectableObject {
    static typeName = "bevy_render::view::visibility::ComputedVisibility";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

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

  class Visibility extends ReflectableObject {
    static typeName = "bevy_render::view::visibility::Visibility";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super({ is_visible: true }, struct);
    }
  }

  class VisibleEntities extends ReflectableObject {
    static typeName = "bevy_render::view::visibility::VisibleEntities";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
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
  if (!window.Bevy.render.view.hasOwnProperty("visibility")) {
    window.Bevy.render.view.visibility = {};
  }

  Object.assign(window.Bevy.render.view.visibility, {
    ComputedVisibility,
    Visibility,
    VisibleEntities,
  });
})(globalThis);
