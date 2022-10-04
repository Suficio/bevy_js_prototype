"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;
  const { DMat2 } = window.glam.f64.dmat2;
  const { DVec2 } = window.glam.f64.dvec2;

  class DAffine2 extends ReflectableObject {
    static typeName = "glam::f64::daffine2::DAffine2";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(
        {
          matrix2: new DMat2({
            x_axis: new DVec2({ x: 1.0, y: 0.0 }),
            y_axis: new DVec2({ x: 0.0, y: 1.0 }),
          }),
          translation: new DVec2({ x: 0.0, y: 0.0 }),
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
  if (!window.glam.f64.hasOwnProperty("daffine2")) {
    window.glam.f64.daffine2 = {};
  }
  Object.assign(window.glam.f64.daffine2, { DAffine2 });
})(globalThis);
