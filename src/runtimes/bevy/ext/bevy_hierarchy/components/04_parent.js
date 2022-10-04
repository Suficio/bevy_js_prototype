"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Parent extends ReflectableArray {
    static typeName = "bevy_hierarchy::components::parent::Parent";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
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
  if (!window.Bevy.hierarchy.components.hasOwnProperty("parent")) {
    window.Bevy.hierarchy.components.parent = {};
  }

  Object.assign(window.Bevy.hierarchy.components.parent, { Parent });
})(globalThis);
