"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

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

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("core")) {
    window.Bevy.core = {};
  }
  if (!window.Bevy.core.hasOwnProperty("name")) {
    window.Bevy.core.name = {};
  }
  Object.assign(window.Bevy.core.name, { Name });
})(globalThis);
