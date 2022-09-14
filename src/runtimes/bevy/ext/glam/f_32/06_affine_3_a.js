"use strict";
((window) => {
  const { ReflectableArray } = window.bevyEcs;
  const { Mat3A } = window.glam.f32.sse2.mat3A;
  const { Vec3A } = window.glam.f32.sse2.vec3A;
  class Affine3A extends ReflectableArray {
    static Zero = () =>
      new Affine3A({
        matrix3: Mat3A.Zero(),
        translation: Vec3A.Zero(),
      });

    static Identity = () =>
      new Affine3A({
        matrix3: Mat3A.Identity(),
        translation: Vec3A.Zero(),
      });

    static Nan = () =>
      new Affine3A({
        matrix3: Mat3A.Nan(),
        translation: Vec3A.Nan(),
      });

    constructor(seq) {
      super([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0], seq);
    }

    static typeName() {
      return "glam::f32::affine3a::Affine3A";
    }

    get matrix3() {
      return new Mat3A(this.slice(0, 9));
    }

    set matrix3(matrix3) {
      this.splice(0, 9, ...matrix3);
    }

    get translation() {
      return new Vec3A(this.slice(9, 12));
    }

    set translation(translation) {
      this.splice(9, 3, ...translation);
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("f32")) {
    window.glam.f32 = {};
  }
  if (!window.glam.f32.hasOwnProperty("affine3A")) {
    window.glam.f32.affine3A = {};
  }
  Object.assign(window.glam.f32.affine3A, { Affine3A });
})(globalThis);
