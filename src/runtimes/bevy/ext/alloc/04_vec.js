"use strict";
((window) => {
  const { Reflect, ReflectableArray, waitForWorld, worldResourceId } =
    window.bevyEcs;
  class Vec extends ReflectableArray {
    static typeName = "alloc::vec::Vec";
    static typeId = new Uint8Array(8);
    constructor(seq) {
      super(null, seq);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), Vec.prototype)
    ))();

  if (!window.hasOwnProperty("alloc")) {
    window.alloc = {};
  }
  if (!window.alloc.hasOwnProperty("vec")) {
    window.alloc.vec = {};
  }
  Object.assign(window.alloc.vec, { Vec });
})(globalThis);
