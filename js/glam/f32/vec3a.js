"use strict";

import { ReflectableArray } from "../../bevy.js";
import { Vector3 } from "../../../node_modules/three/src/math/Vector3.js";

export class Vec3A extends ReflectableArray {
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

  constructor(seq) {
    super(null, seq);
  }

  typeName() {
    return "glam::f32::Vec3A";
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

// Inject properties into constructor
(() => {
  const { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(
    Vector3.prototype
  );
  Object.defineProperties(Vec3A.prototype, prototypePatch);

  Vec3A.prototype.isVector3 = true;
})();
