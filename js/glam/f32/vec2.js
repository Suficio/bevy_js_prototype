"use strict";

import { ReflectableObject } from "../../bevy.js";
import { Vector2 } from "../../../node_modules/three/src/math/Vector2.js";

export class Vec2 extends ReflectableObject {
  constructor(struct) {
    super(
      "glam::vec2::Vec2",
      {
        x: 0.0,
        y: 0.0,
      },
      struct
    );

    let { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(
      Vector2.prototype
    );
    Object.defineProperties(Vec2.prototype, prototypePatch);

    Vec2.prototype.isVector2 = true;
  }

  // Vector2 implementation expects to be able to evaluate [`x`, `y`]

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
}
