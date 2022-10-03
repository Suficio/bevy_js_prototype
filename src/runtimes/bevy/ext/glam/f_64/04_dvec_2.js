"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;

  class DVec2 extends ReflectableObject {
    static typeName = "glam::f64::dvec2::DVec2";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super({ x: 0.0, y: 0.0 }, struct);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f64")) {
    window.glam.f64 = {};
  }
  if (!window.glam.f64.hasOwnProperty("dvec2")) {
    window.glam.f64.dvec2 = {};
  }
  Object.assign(window.glam.f64.dvec2, { DVec2 });
})(globalThis);
