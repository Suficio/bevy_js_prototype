"use strict";

import { ReflectableArray } from "../../../bevy.js";
import { Quaternion } from "../../../../node_modules/three/src/math/Quaternion.js";

export class Quat extends ReflectableArray {
  constructor(seq) {
    super("glam::quat::Quat", [0.0, 0.0, 0.0, 0.0], seq);

    const { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(
      Quaternion.prototype
    );
    Object.defineProperties(Quat.prototype, prototypePatch);

    Quat.prototype.isQuaternion = true;
  }

  // Quaternion implementation expects to be able to evaluate [`_x`, `_y`, `_z`, `_w`]
  // Quaternion.prototype will itself provide [`x`, `y`, `z`, `w`] accessors

  get _x() {
    return this.tuple_struct[0];
  }

  set _x(x) {
    this.tuple_struct[0] = x;
  }

  get _y() {
    return this.tuple_struct[1];
  }

  set _y(y) {
    this.tuple_struct[1] = y;
  }

  get _z() {
    return this.tuple_struct[2];
  }

  set _z(z) {
    this.tuple_struct[2] = z;
  }

  get _w() {
    return this.tuple_struct[3];
  }

  set _w(w) {
    this.tuple_struct[3] = w;
  }
}
