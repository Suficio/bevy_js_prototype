"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class IVec2 extends ReflectableObject {
    static typeName = "glam::i32::ivec2::IVec2";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(struct) {
      super({ x: 0, y: 0 }, struct);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("i32")) {
    window.glam.i32 = {};
  }
  if (!window.glam.i32.hasOwnProperty("ivec2")) {
    window.glam.i32.ivec2 = {};
  }

  Object.assign(window.glam.i32.ivec2, { IVec2 });
})(globalThis);
