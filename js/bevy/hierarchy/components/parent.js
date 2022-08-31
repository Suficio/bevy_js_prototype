"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class Parent extends ReflectableArray {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_hierarchy::components::parent::Parent"
    }
}