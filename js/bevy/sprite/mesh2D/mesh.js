"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class Mesh2dHandle extends ReflectableArray {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_sprite::mesh2d::mesh::Mesh2dHandle"
    }
}