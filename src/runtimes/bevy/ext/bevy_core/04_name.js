"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;

  class Name extends ReflectableObject {
    static typeName = "bevy_core::name::Name";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super({ hash: 13963134382976710451, name: "" }, struct);
    }
  }

  if (!window.hasOwnProperty("bevyCore")) {
    window.bevyCore = {};
  }
  if (!window.bevyCore.hasOwnProperty("name")) {
    window.bevyCore.name = {};
  }
  Object.assign(window.bevyCore.name, { Name });
})(globalThis);
