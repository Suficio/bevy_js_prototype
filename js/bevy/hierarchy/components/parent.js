"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class Parent extends ReflectableArray {
    constructor(seq) {
        super(null, seq)
    }
    typeName() {
        return "bevy_hierarchy::components::parent::Parent"
    }
}