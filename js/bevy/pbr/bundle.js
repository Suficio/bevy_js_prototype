"use strict";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class CubemapVisibleEntities extends ReflectableObject {
    constructor(struct) {
        super(null, struct)
    }
    typeName() {
        return "bevy_pbr::bundle::CubemapVisibleEntities"
    }
}