"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs;
  class IVec2 extends ReflectableObject {
    constructor(struct) {
      super({ x: 0, y: 0 }, struct);
    }
    typeName() {
      return "glam::i32::ivec2::IVec2";
    }
  }
  if (!window.hasOwnProperty("glam")) {
    window.glam = {};
  }
  if (!window.glam.hasOwnProperty("i32")) {
    window.glam.i32 = {};
  }
  if (!window.glam.i32.hasOwnProperty("ivec2")) {
    window.glam.i32.ivec2 = {};
  }
  Object.assign(window.glam.i32.ivec2, { IVec2 });
})(globalThis);
