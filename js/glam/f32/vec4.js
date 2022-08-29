"use strict";

import { ReflectableObject } from "../../bevy.js";
import { Vector4 } from "../../../node_modules/three/src/math/Vector4.js";

export class Vec4 extends ReflectableObject {
  constructor(struct) {
    super(
      "glam::vec4::Vec4",
      null,
      {
        x: 0.0,
        y: 0.0,
        z: 0.0,
        w: 0.0,
      },
      struct
    );
  }

  // Vector4 implementation expects to be able to evaluate [`x`, `y`, `z`, `w`]

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

  get w() {
    return this.struct.w;
  }

  set w(w) {
    this.struct.w = w;
  }
}

// Inject properties into constructor
(() => {
  const { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(
    Vector4.prototype
  );
  Object.defineProperties(Vec4.prototype, prototypePatch);

  Vec4.prototype.isVector4 = true;
})();
