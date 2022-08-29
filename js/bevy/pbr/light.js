"use strict";
import {
    OrthographicProjection,
    WindowOrigin,
    ScalingMode,
} from "./../render/camera/projection.js";
import {
    Color,
} from "./../render/color.js";
import {
    ReflectableObject,
} from "./../../bevy.js";
export class DirectionalLightShadowMap extends ReflectableObject {
    constructor(struct) {
        super("bevy_pbr::light::DirectionalLightShadowMap", null, null, struct)
    }
    get size() {
        return this.struct.size;
    }
    set size(size) {
        this.struct.size = size
    }
};
export class PointLightShadowMap extends ReflectableObject {
    constructor(struct) {
        super("bevy_pbr::light::PointLightShadowMap", null, null, struct)
    }
    get size() {
        return this.struct.size;
    }
    set size(size) {
        this.struct.size = size
    }
};
export class AmbientLight extends ReflectableObject {
    constructor(struct) {
        super("bevy_pbr::light::AmbientLight", null, null, struct)
    }
    get color() {
        return this.struct.color;
    }
    set color(color) {
        this.struct.color = color
    }
    get brightness() {
        return this.struct.brightness;
    }
    set brightness(brightness) {
        this.struct.brightness = brightness
    }
};
export class DirectionalLight extends ReflectableObject {
    constructor(struct) {
        super("bevy_pbr::light::DirectionalLight", null, {
            color: Color.Rgba({
                red: 1.0,
                green: 1.0,
                blue: 1.0,
                alpha: 1.0,
            }),
            illuminance: 100000.0,
            shadows_enabled: false,
            shadow_projection: new OrthographicProjection({
                left: -100.0,
                right: 100.0,
                bottom: -100.0,
                top: 100.0,
                near: -100.0,
                far: 100.0,
                window_origin: WindowOrigin.Center(),
                scaling_mode: ScalingMode.WindowSize(),
                scale: 1.0,
            }),
            shadow_depth_bias: 0.02,
            shadow_normal_bias: 0.6,
        }, struct)
    }
    get color() {
        return this.struct.color;
    }
    set color(color) {
        this.struct.color = color
    }
    get illuminance() {
        return this.struct.illuminance;
    }
    set illuminance(illuminance) {
        this.struct.illuminance = illuminance
    }
    get shadowsEnabled() {
        return this.struct.shadows_enabled;
    }
    set shadowsEnabled(shadowsEnabled) {
        this.struct.shadows_enabled = shadowsEnabled
    }
    get shadowProjection() {
        return this.struct.shadow_projection;
    }
    set shadowProjection(shadowProjection) {
        this.struct.shadow_projection = shadowProjection
    }
    get shadowDepthBias() {
        return this.struct.shadow_depth_bias;
    }
    set shadowDepthBias(shadowDepthBias) {
        this.struct.shadow_depth_bias = shadowDepthBias
    }
    get shadowNormalBias() {
        return this.struct.shadow_normal_bias;
    }
    set shadowNormalBias(shadowNormalBias) {
        this.struct.shadow_normal_bias = shadowNormalBias
    }
};
export class SpotLight extends ReflectableObject {
    constructor(struct) {
        super("bevy_pbr::light::SpotLight", null, {
            color: Color.Rgba({
                red: 1.0,
                green: 1.0,
                blue: 1.0,
                alpha: 1.0,
            }),
            intensity: 800.0,
            range: 20.0,
            radius: 0.0,
            shadows_enabled: false,
            shadow_depth_bias: 0.02,
            shadow_normal_bias: 0.6,
            outer_angle: 0.7853982,
            inner_angle: 0.0,
        }, struct)
    }
    get color() {
        return this.struct.color;
    }
    set color(color) {
        this.struct.color = color
    }
    get intensity() {
        return this.struct.intensity;
    }
    set intensity(intensity) {
        this.struct.intensity = intensity
    }
    get range() {
        return this.struct.range;
    }
    set range(range) {
        this.struct.range = range
    }
    get radius() {
        return this.struct.radius;
    }
    set radius(radius) {
        this.struct.radius = radius
    }
    get shadowsEnabled() {
        return this.struct.shadows_enabled;
    }
    set shadowsEnabled(shadowsEnabled) {
        this.struct.shadows_enabled = shadowsEnabled
    }
    get shadowDepthBias() {
        return this.struct.shadow_depth_bias;
    }
    set shadowDepthBias(shadowDepthBias) {
        this.struct.shadow_depth_bias = shadowDepthBias
    }
    get shadowNormalBias() {
        return this.struct.shadow_normal_bias;
    }
    set shadowNormalBias(shadowNormalBias) {
        this.struct.shadow_normal_bias = shadowNormalBias
    }
    get outerAngle() {
        return this.struct.outer_angle;
    }
    set outerAngle(outerAngle) {
        this.struct.outer_angle = outerAngle
    }
    get innerAngle() {
        return this.struct.inner_angle;
    }
    set innerAngle(innerAngle) {
        this.struct.inner_angle = innerAngle
    }
};
export class PointLight extends ReflectableObject {
    constructor(struct) {
        super("bevy_pbr::light::PointLight", null, {
            color: Color.Rgba({
                red: 1.0,
                green: 1.0,
                blue: 1.0,
                alpha: 1.0,
            }),
            intensity: 800.0,
            range: 20.0,
            radius: 0.0,
            shadows_enabled: false,
            shadow_depth_bias: 0.02,
            shadow_normal_bias: 0.6,
        }, struct)
    }
    get color() {
        return this.struct.color;
    }
    set color(color) {
        this.struct.color = color
    }
    get intensity() {
        return this.struct.intensity;
    }
    set intensity(intensity) {
        this.struct.intensity = intensity
    }
    get range() {
        return this.struct.range;
    }
    set range(range) {
        this.struct.range = range
    }
    get radius() {
        return this.struct.radius;
    }
    set radius(radius) {
        this.struct.radius = radius
    }
    get shadowsEnabled() {
        return this.struct.shadows_enabled;
    }
    set shadowsEnabled(shadowsEnabled) {
        this.struct.shadows_enabled = shadowsEnabled
    }
    get shadowDepthBias() {
        return this.struct.shadow_depth_bias;
    }
    set shadowDepthBias(shadowDepthBias) {
        this.struct.shadow_depth_bias = shadowDepthBias
    }
    get shadowNormalBias() {
        return this.struct.shadow_normal_bias;
    }
    set shadowNormalBias(shadowNormalBias) {
        this.struct.shadow_normal_bias = shadowNormalBias
    }
};