"use strict";
((window) => {
  const { ReflectableArray } = window.bevyEcs.reflect;
  class Vec extends ReflectableArray {
    constructor(seq) {
      super(null, seq);
    }
    typeName() {
      return "alloc::vec::Vec";
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
