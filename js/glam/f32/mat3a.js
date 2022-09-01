"use strict";

import { ReflectableArray } from "../../bevy.js";
import { Vec3A } from "./vec3a.js";

export class Mat3A extends ReflectableArray {
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

  constructor(object) {
    super(null, object);
  }

  typeName() {
    return "glam::f32::Mat3A";
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
