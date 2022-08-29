"use strict";
import {
    ReflectableArray,
} from "./../../../bevy.js";
export class Mesh2dHandle extends ReflectableArray {
    constructor(seq) {
        super("bevy_sprite::mesh2d::mesh::Mesh2dHandle", null, null, seq)
    }
}