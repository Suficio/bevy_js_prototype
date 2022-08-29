"use strict";
import { ReflectableArray } from "./../bevy";
export class Vec extends ReflectableArray {
  constructor(generics, seq) {
    super("alloc::vec::Vec", generics, [], seq);
  }
}
