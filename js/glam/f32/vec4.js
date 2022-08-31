"use strict";

import { ReflectableObject } from "../../bevy.js";
import { Vector4 } from "../../../node_modules/three/src/math/Vector4.js";

export class Vec4 extends ReflectableObject {
  constructor(struct) {
    super(
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

  typeName() {
    return "glam::vec4::Vec4";
  }

  // Vector4 implementation expects to be able to evaluate [`x`, `y`, `z`, `w`]

  // get x() {
  //   return this.x;
  // }

  // set x(x) {
  //   this.x = x;
  // }

  // get y() {
  //   return this.y;
  // }

  // set y(y) {
  //   this.y = y;
  // }

  // get z() {
  //   return this.z;
  // }

  // set z(z) {
  //   this.z = z;
  // }

  // get w() {
  //   return this.w;
  // }

  // set w(w) {
  //   this.w = w;
  // }
}

// Inject properties into constructor
(() => {
  const { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(
    Vector4.prototype
  );
  Object.defineProperties(Vec4.prototype, prototypePatch);

  Vec4.prototype.isVector4 = true;
})();
