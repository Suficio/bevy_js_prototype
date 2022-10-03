"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.bevyEcs;

  class Children extends ReflectableArray {
    static typeName = "bevy_hierarchy::components::children::Children";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(seq) {
      super(null, seq);
    }
  }

  if (!window.hasOwnProperty("bevyHierarchy")) {
    window.bevyHierarchy = {};
  }
  if (!window.bevyHierarchy.hasOwnProperty("components")) {
    window.bevyHierarchy.components = {};
  }
  if (!window.bevyHierarchy.components.hasOwnProperty("children")) {
    window.bevyHierarchy.components.children = {};
  }
  Object.assign(window.bevyHierarchy.components.children, { Children });
})(globalThis);
