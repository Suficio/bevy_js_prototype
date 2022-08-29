"use strict";

import { Vec3 } from "./vec3.js";

export class Vec3A extends Vec3 {
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

  constructor(struct) {
    super(struct);
    this.type = "glam::f32::Vec3A";
  }

  reflectUntyped() {
    return [this.x, this.y, this.z];
  }
}
