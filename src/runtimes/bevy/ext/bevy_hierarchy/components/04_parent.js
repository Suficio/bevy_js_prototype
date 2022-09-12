"use strict";
((window) => {
  const { ReflectableArray } = window.bevyEcs;
  class Parent extends ReflectableArray {
    constructor(seq) {
      super(null, seq);
    }
    typeName() {
      return "bevy_hierarchy::components::parent::Parent";
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
