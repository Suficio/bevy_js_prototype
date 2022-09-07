"use strict";
((window) => {
  class Option {
    static None = () => undefined;
    static Some = (value) => value;

    constructor(value) {
      return value;
    }
  }
  if (!window.hasOwnProperty("core")) {
    window.core = {};
  }
  if (!window.core.hasOwnProperty("option")) {
    window.core.option = {};
  }
  Object.assign(window.core.option, { Option });
})(globalThis);
