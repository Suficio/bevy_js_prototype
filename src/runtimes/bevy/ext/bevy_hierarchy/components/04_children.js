"use strict";
((window) => {
  const { ReflectableArray } = window.bevyEcs;
  class Children extends ReflectableArray {
    constructor(seq) {
      super(null, seq);
    }
    typeName() {
      return "bevy_hierarchy::components::children::Children";
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
