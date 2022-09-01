"use strict";

export class Option {
  static None = () => undefined;
  static Some = (value) => value;

  constructor(value) {
    return value;
  }
}
