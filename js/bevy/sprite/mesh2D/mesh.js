"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class Mesh2dHandle extends ReflectableArray {
    constructor(seq) {
        super(null, seq)
    }
    typeName() {
        return "bevy_sprite::mesh2d::mesh::Mesh2dHandle"
    }
}