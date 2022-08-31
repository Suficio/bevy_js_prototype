"use strict";

import { ReflectableObject } from "../../bevy.js";
import { Vector3 } from "../../../node_modules/three/src/math/Vector3.js";

export class Vec3 extends ReflectableObject {
  static Zero = () => new Vec3({ x: 0.0, y: 0.0, z: 0.0 });
  static One = () => new Vec3({ x: 1.0, y: 1.0, z: 1.0 });
  static NegOne = () => new Vec3({ x: -1.0, y: -1.0, z: -1.0 });
  static Nan = () => new Vec3({ x: NaN, y: NaN, z: NaN });
  static X = () => new Vec3({ x: 1.0, y: 0.0, z: 0.0 });
  static Y = () => new Vec3({ x: 0.0, y: 1.0, z: 0.0 });
  static Z = () => new Vec3({ x: 0.0, y: 0.0, z: 1.0 });
  static NegX = () => new Vec3({ x: -1.0, y: 0.0, z: 0.0 });
  static NegY = () => new Vec3({ x: 0.0, y: -1.0, z: 0.0 });
  static NegZ = () => new Vec3({ x: 0.0, y: 0.0, z: -1.0 });
  static Axes = () => [Vec3.X(), Vec3.Y(), Vec3.Z()];

  constructor(struct) {
    super(
      null,
      {
        x: 0.0,
        y: 0.0,
        z: 0.0,
      },
      struct
    );
  }

  typeName() {
    return "glam::vec3::Vec3";
  }
}

// Inject properties into constructor
(() => {
  const { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(
    Vector3.prototype
  );
  Object.defineProperties(Vec3.prototype, prototypePatch);

  Vec3.prototype.isVector3 = true;
})();
