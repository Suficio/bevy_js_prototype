"use strict";
((window) => {
  const { Reflect, ReflectableArray, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Parent extends ReflectableArray {
    static typeName = "bevy_hierarchy::components::parent::Parent";
    static typeId = new Uint8Array(8);
    constructor(seq) {
      super(null, seq);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Parent.prototype)
    ))();

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
