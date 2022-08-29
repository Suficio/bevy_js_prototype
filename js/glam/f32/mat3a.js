"use strict";

import { ReflectableObject } from "../../bevy.js";
import { Vec3A } from "./vec3a.js";

export class Mat3A extends ReflectableObject {
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
    super("glam::f32::Mat3A", null, null, object);
  }

  get x_axis() {
    return this.struct.x_axis;
  }

  set x_axis(x_axis) {
    this.struct.x_axis = x_axis;
  }

  get y_axis() {
    return this.struct.y_axis;
  }

  set y_axis(y_axis) {
    this.struct.y_axis = y_axis;
  }

  get z_axis() {
    return this.struct.z_axis;
  }

  set z_axis(z_axis) {
    this.struct.z_axis = z_axis;
  }
}
