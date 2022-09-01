"use strict";

import { ReflectableArray } from "../../../bevy.js";
import { Quaternion } from "../../../../node_modules/three/src/math/Quaternion.js";

export class Quat extends ReflectableArray {
  static Zero = () => new Affine3A([0.0, 0.0, 0.0, 0.0]);
  static Identity = () => new Affine3A([0.0, 0.0, 0.0, 1.0]);
  static Nan = () => new Affine3A([NaN, NaN, NaN, NaN]);

  constructor(seq) {
    super(null, seq);
  }

  typeName() {
    return "glam::quat::Quat";
  }

  // Quaternion implementation expects to be able to evaluate [`_x`, `_y`, `_z`, `_w`]
  // Quaternion.prototype will itself provide [`x`, `y`, `z`, `w`] accessors

  get _x() {
    return this[0];
  }

  set _x(x) {
    this[0] = x;
  }

  get _y() {
    return this[1];
  }

  set _y(y) {
    this[1] = y;
  }

  get _z() {
    return this[2];
  }

  set _z(z) {
    this[2] = z;
  }

  get _w() {
    return this[3];
  }

  set _w(w) {
    this[3] = w;
  }
}

// Inject properties into constructor
(() => {
  const { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(
    Quaternion.prototype
  );
  Object.defineProperties(Quat.prototype, prototypePatch);

  Quat.prototype.isQuaternion = true;
})();
