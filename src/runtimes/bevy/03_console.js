"use strict";
((window) => {
  const core = Deno.core;
  const { ObjectDefineProperties } = window.__bootstrap.primordials;
  const { Console } = window.__bootstrap.console;

  function nonEnumerable(value) {
    return {
      value,
      writable: true,
      enumerable: false,
      configurable: true,
    };
  }

  const windowOrWorkerGlobalScope = {
    console: nonEnumerable(
      new Console((msg, level) => core.print(msg, level > 1))
    ),
  };

  ObjectDefineProperties(window, windowOrWorkerGlobalScope);
})(globalThis);
