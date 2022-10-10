"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class DVec3 extends ReflectableObject {
    static typeName = "glam::f64::dvec3::DVec3";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(struct) {
      super({ x: 0.0, y: 0.0, z: 0.0 }, struct);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f64")) {
    window.glam.f64 = {};
  }
  if (!window.glam.f64.hasOwnProperty("dvec3")) {
    window.glam.f64.dvec3 = {};
  }

  Object.assign(window.glam.f64.dvec3, { DVec3 });
})(globalThis);
