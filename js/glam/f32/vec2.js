"use strict";

import { ReflectableObject } from "../../bevy.js";
import { Vector2 } from "../../../node_modules/three/src/math/Vector2.js";

export class Vec2 extends ReflectableObject {
  constructor(struct) {
    super(
      null,
      {
        x: 0.0,
        y: 0.0,
      },
      struct
    );
  }

  typeName() {
    return "glam::vec2::Vec2";
  }
}

// Inject properties into constructor
(() => {
  let { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(
    Vector2.prototype
  );
  Object.defineProperties(Vec2.prototype, prototypePatch);

  Vec2.prototype.isVector2 = true;
})();
