"use strict";

// Removes the `__proto__` for security reasons.
// https://tc39.es/ecma262/#sec-get-object.prototype.__proto__
delete Object.prototype.__proto__;

((window) => {
  Deno.core.initializeAsyncOps();
})(globalThis);
