"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class DVec4 extends ReflectableObject {
    static typeName = "glam::f64::dvec4::DVec4";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(struct) {
      super({ x: 0.0, y: 0.0, z: 0.0, w: 0.0 }, struct);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f64")) {
    window.glam.f64 = {};
  }
  if (!window.glam.f64.hasOwnProperty("dvec4")) {
    window.glam.f64.dvec4 = {};
  }

  Object.assign(window.glam.f64.dvec4, { DVec4 });
})(globalThis);
