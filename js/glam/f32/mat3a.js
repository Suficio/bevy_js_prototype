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
    super(null, null, object);
  }

  typeName() {
    return "glam::f32::Mat3A";
  }
}
