"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Children extends ReflectableArray {
    static typeName = "bevy_hierarchy::components::children::Children";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(seq) {
      super(null, seq);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("hierarchy")) {
    window.Bevy.hierarchy = {};
  }
  if (!window.Bevy.hierarchy.hasOwnProperty("components")) {
    window.Bevy.hierarchy.components = {};
  }
  if (!window.Bevy.hierarchy.components.hasOwnProperty("children")) {
    window.Bevy.hierarchy.components.children = {};
  }

  Object.assign(window.Bevy.hierarchy.components.children, { Children });
})(globalThis);
