"use strict";
((window) => {
  const { ReflectableArray } = window.bevyEcs;

  class Vec extends ReflectableArray {
    static typeName = "alloc::vec::Vec";

    constructor(seq) {
      super(null, seq);
    }
  }

  if (!window.hasOwnProperty("alloc")) {
    window.alloc = {};
  }
  if (!window.alloc.hasOwnProperty("vec")) {
    window.alloc.vec = {};
  }
  Object.assign(window.alloc.vec, { Vec });
})(globalThis);
