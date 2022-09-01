"use strict";

import { ReflectableArray } from "../../bevy.js";
import { Vector4 } from "../../../node_modules/three/src/math/Vector4.js";

export class Vec4 extends ReflectableArray {
  constructor(struct) {
    super(null, struct);
  }

  typeName() {
    return "glam::vec4::Vec4";
  }

  // Vector4 implementation expects to be able to evaluate [`x`, `y`, `z`, `w`]

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

  get w() {
    return this[3];
  }

  set w(w) {
    this[3] = w;
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
