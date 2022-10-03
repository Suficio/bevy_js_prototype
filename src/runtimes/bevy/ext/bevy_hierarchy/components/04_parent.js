"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.bevyEcs;

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

  if (!window.hasOwnProperty("bevyHierarchy")) {
    window.bevyHierarchy = {};
  }
  if (!window.bevyHierarchy.hasOwnProperty("components")) {
    window.bevyHierarchy.components = {};
  }
  if (!window.bevyHierarchy.components.hasOwnProperty("parent")) {
    window.bevyHierarchy.components.parent = {};
  }
  Object.assign(window.bevyHierarchy.components.parent, { Parent });
})(globalThis);
