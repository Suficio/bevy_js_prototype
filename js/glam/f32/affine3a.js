"use strict";

import { ReflectableObject } from "../../bevy.js";
import { Mat3A } from "./mat3a.js";
import { Vec3A } from "./vec3a.js";

export class Affine3A extends ReflectableObject {
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

  constructor(struct) {
    super("glam::f32::Affine3A", null, null, struct);
  }

  get matrix3() {
    return this.struct.matrix3;
  }

  set matrix3(matrix3) {
    this.struct.matrix3 = matrix3;
  }

  get translation() {
    return this.struct.translation;
  }

  set translation(translation) {
    this.struct.translation = translation;
  }

  reflectUntyped() {
    return [
      ...this.matrix3.x_axis.reflectUntyped(),
      ...this.matrix3.y_axis.reflectUntyped(),
      ...this.matrix3.z_axis.reflectUntyped(),
      ...this.translation.reflectUntyped(),
    ];
  }
}
