"use strict";
((window) => {
  const { ReflectableArray, TypeRegistry, worldResourceId } = window.Bevy.ecs;

  class Vec3A extends ReflectableArray {
    static Zero = () => new Vec3A({ x: 0.0, y: 0.0, z: 0.0 });
    static One = () => new Vec3A({ x: 1.0, y: 1.0, z: 1.0 });
    static NegOne = () => new Vec3A({ x: -1.0, y: -1.0, z: -1.0 });
    static Nan = () => new Vec3A({ x: NaN, y: NaN, z: NaN });
    static X = () => new Vec3A({ x: 1.0, y: 0.0, z: 0.0 });
    static Y = () => new Vec3A({ x: 0.0, y: 1.0, z: 0.0 });
    static Z = () => new Vec3A({ x: 0.0, y: 0.0, z: 1.0 });
    static NegX = () => new Vec3A({ x: -1.0, y: 0.0, z: 0.0 });
    static NegY = () => new Vec3A({ x: 0.0, y: -1.0, z: 0.0 });
    static NegZ = () => new Vec3A({ x: 0.0, y: 0.0, z: -1.0 });
    static Axes = () => [Vec3A.X(), Vec3A.Y(), Vec3A.Z()];

    static typeName = "glam::f32::sse2::vec3a::Vec3A";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super([0.0, 0.0, 0.0], struct);
    }

    get x() {
      return this[0];
    }
    set x(x) {
      this[0] = x;
    }
    get y() {
      return this[1];
    }
    set y(y) {
      this[1] = y;
    }
    get z() {
      return this[2];
    }
    set z(z) {
      this[2] = z;
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
  if (!window.glam.f32.sse2.hasOwnProperty("vec3A")) {
    window.glam.f32.sse2.vec3A = {};
  }
  Object.assign(window.glam.f32.sse2.vec3A, { Vec3A });
})(globalThis);
