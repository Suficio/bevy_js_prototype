"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;
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
