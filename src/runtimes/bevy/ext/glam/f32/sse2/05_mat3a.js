"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.Bevy.ecs;
  const { Vec3A } = window.glam.f32.sse2.vec3A;

  class Mat3A extends ReflectableArray {
    static Zero = () =>
      new Mat3A({
        x_axis: Vec3A.Zero(),
        y_axis: Vec3A.Zero(),
        z_axis: Vec3A.Zero(),
      });
    static Identity = () =>
      new Mat3A({
        x_axis: Vec3A.X(),
        y_axis: Vec3A.Y(),
        z_axis: Vec3A.Z(),
      });
    static Nan = () =>
      new Mat3A({
        x_axis: Vec3A.Nan(),
        y_axis: Vec3A.Nan(),
        z_axis: Vec3A.Nan(),
      });

    static typeName = "glam::f32::sse2::mat3a::Mat3A";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(seq) {
      super([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0], seq);
    }

    get x_axis() {
      return new Vec3A(this.slice(0, 3));
    }
    set x_axis(x_axis) {
      this.splice(0, 3, ...x_axis);
    }
    get y_axis() {
      return new Vec3A(this.slice(3, 6));
    }
    set y_axis(y_axis) {
      this.splice(3, 3, ...y_axis);
    }
    get z_axis() {
      return new Vec3A(this.slice(6, 9));
    }
    set z_axis(z_axis) {
      this.splice(6, 3, ...z_axis);
    }
  }

  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f32")) {
    window.glam.f32 = {};
  }
  if (!window.glam.f32.hasOwnProperty("sse2")) {
    window.glam.f32.sse2 = {};
  }
  if (!window.glam.f32.sse2.hasOwnProperty("mat3A")) {
    window.glam.f32.sse2.mat3A = {};
  }
  Object.assign(window.glam.f32.sse2.mat3A, { Mat3A });
})(globalThis);
