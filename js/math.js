"use strict";

import { ReflectableStruct, ReflectableTupleStruct } from "./bevy";

import { Vector2 } from "../node_modules/three/src/math/Vector2";
import { Vector3 } from "../node_modules/three/src/math/Vector3";
import { Vector4 } from "../node_modules/three/src/math/Vector4";
import { Quaternion } from "../node_modules/three/src/math/Quaternion";

export class Vec2 extends ReflectableStruct {
    constructor(struct) {
        super(
            "glam::vec2::Vec2",
            {
                x: 0.0,
                y: 0.0,
            },
            struct
        );

        let { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(Vector2.prototype);
        Object.defineProperties(Vec2.prototype, prototypePatch);

        Vec2.prototype.isVector2 = true;
    }

    // Vector2 implementation expects to be able to evaluate [`x`, `y`]

    get x() {
        return this.struct.x;
    }

    set x(x) {
        this.struct.x = x;
    }

    get y() {
        return this.struct.y;
    }

    set y(y) {
        this.struct.y = y;
    }
}

export class Vec3 extends ReflectableStruct {
    constructor(struct) {
        super(
            "glam::vec3::Vec3",
            {
                x: 0.0,
                y: 0.0,
                z: 0.0,
            },
            struct
        );

        const { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(Vector3.prototype);
        Object.defineProperties(Vec3.prototype, prototypePatch);

        Vec3.prototype.isVector3 = true;
    }

    // Vector3 implementation expects to be able to evaluate [`x`, `y`, `z`]

    get x() {
        return this.struct.x;
    }

    set x(x) {
        this.struct.x = x;
    }

    get y() {
        return this.struct.y;
    }

    set y(y) {
        this.struct.y = y;
    }

    get z() {
        return this.struct.z;
    }

    set z(z) {
        this.struct.z = z;
    }
}

export class Vec4 extends ReflectableStruct {
    constructor(struct) {
        super(
            "glam::vec4::Vec4",
            {
                x: 0.0,
                y: 0.0,
                z: 0.0,
                w: 0.0
            },
            struct
        );

        const { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(Vector4.prototype);
        Object.defineProperties(Vec4.prototype, prototypePatch);

        Vec4.prototype.isVector4 = true;
    }

    // Vector4 implementation expects to be able to evaluate [`x`, `y`, `z`, `w`]

    get x() {
        return this.struct.x;
    }

    set x(x) {
        this.struct.x = x;
    }

    get y() {
        return this.struct.y;
    }

    set y(y) {
        this.struct.y = y;
    }

    get z() {
        return this.struct.z;
    }

    set z(z) {
        this.struct.z = z;
    }

    get w() {
        return this.struct.w;
    }

    set w(w) {
        this.struct.w = w;
    }
}

export class Quat extends ReflectableTupleStruct {
    constructor(seq) {
        super(
            "glam::quat::Quat",
            [
                0.0,
                0.0,
                0.0,
                0.0
            ],
            seq
        );

        const { constructor, ...prototypePatch } = Object.getOwnPropertyDescriptors(Quaternion.prototype);
        Object.defineProperties(Quat.prototype, prototypePatch);

        Quat.prototype.isQuaternion = true;
    }

    // Quaternion implementation expects to be able to evaluate [`_x`, `_y`, `_z`, `_w`]
    // Quaternion.prototype will itself provide [`x`, `y`, `z`, `w`] accessors

    get _x() {
        return this.tuple_struct[0];
    }

    set _x(x) {
        this.tuple_struct[0] = x;
    }

    get _y() {
        return this.tuple_struct[1];
    }

    set _y(y) {
        this.tuple_struct[1] = y;
    }

    get _z() {
        return this.tuple_struct[2];
    }

    set _z(z) {
        this.tuple_struct[2] = z;
    }

    get _w() {
        return this.tuple_struct[3];
    }

    set _w(w) {
        this.tuple_struct[3] = w;
    }
}