"use strict";

import { ReflectableObject } from "../../bevy.js";
import { Vector3 } from "../../../node_modules/three/src/math/Vector3.js";

export class Vec3 extends ReflectableObject {
  constructor(struct) {
    super(
      "glam::vec3::Vec3",
      {
        x: 0.0,
        y: 0.0,
        z: 0.0,
      },
      struct
    );

    const { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(
      Vector3.prototype
    );
    Object.defineProperties(Vec3.prototype, prototypePatch);

    Vec3.prototype.isVector3 = true;
  }

  // Vector3 implementation expects to be able to evaluate [`x`, `y`, `z`]

  get x() {
    return this.struct.x;
  }

  set x(x) {
    this.struct.x = x;
  }

  get y() {
    return this.struct.y;
  }

  set y(y) {
    this.struct.y = y;
  }

  get z() {
    return this.struct.z;
  }

  set z(z) {
    this.struct.z = z;
  }
}
