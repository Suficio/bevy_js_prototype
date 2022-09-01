"use strict";
import { ReflectableArray } from "./../bevy";
export class Vec extends ReflectableArray {
    constructor(seq) {
        super([], seq);
    }
    typeName() {
        return "alloc::vec::Vec";
    }
}
