"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class Parent extends ReflectableArray {
    constructor(seq) {
        super("bevy_hierarchy::components::parent::Parent", null, null, seq)
    }
}