"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;
  const { DVec2 } = window.glam.f64.dvec2;

  class DMat2 extends ReflectableObject {
    static typeName = "glam::f64::dmat2::DMat2";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(struct) {
      super(
        {
          x_axis: new DVec2({ x: 1.0, y: 0.0 }),
          y_axis: new DVec2({ x: 0.0, y: 1.0 }),
        },
        struct
      );
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f64")) {
    window.glam.f64 = {};
  }
  if (!window.glam.f64.hasOwnProperty("dmat2")) {
    window.glam.f64.dmat2 = {};
  }

  Object.assign(window.glam.f64.dmat2, { DMat2 });
})(globalThis);
