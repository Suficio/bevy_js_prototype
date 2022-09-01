"use strict";

import { ReflectableArray } from "../../bevy.js";
import { Mat3A } from "./mat3a.js";
import { Vec3A } from "./vec3a.js";

export class Affine3A extends ReflectableArray {
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
    super(null, seq);
  }

  typeName() {
    return "glam::f32::Affine3A";
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
