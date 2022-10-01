"use strict";
((window) => {
  const { Reflect, ReflectableObject, waitForWorld, worldResourceId } =
    window.bevyEcs;
  const { OrthographicProjection, ScalingMode, WindowOrigin } =
    window.bevyRender.camera.projection;
  const { Color } = window.bevyRender.color;
  class AmbientLight extends ReflectableObject {
    static typeName = "bevy_pbr::light::AmbientLight";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), AmbientLight.prototype)
    ))();

  class DirectionalLight extends ReflectableObject {
    static typeName = "bevy_pbr::light::DirectionalLight";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(
        {
          color: Color.Rgba({ red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0 }),
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
        },
        struct
      );
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), DirectionalLight.prototype)
    ))();

  class DirectionalLightShadowMap extends ReflectableObject {
    static typeName = "bevy_pbr::light::DirectionalLightShadowMap";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(
        worldResourceId(),
        DirectionalLightShadowMap.prototype
      )
    ))();

  class PointLight extends ReflectableObject {
    static typeName = "bevy_pbr::light::PointLight";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(
        {
          color: Color.Rgba({ red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0 }),
          intensity: 800.0,
          range: 20.0,
          radius: 0.0,
          shadows_enabled: false,
          shadow_depth_bias: 0.02,
          shadow_normal_bias: 0.6,
        },
        struct
      );
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), PointLight.prototype)
    ))();

  class PointLightShadowMap extends ReflectableObject {
    static typeName = "bevy_pbr::light::PointLightShadowMap";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(null, struct);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), PointLightShadowMap.prototype)
    ))();

  class SpotLight extends ReflectableObject {
    static typeName = "bevy_pbr::light::SpotLight";
    static typeId = new Uint8Array(8);
    constructor(struct) {
      super(
        {
          color: Color.Rgba({ red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0 }),
          intensity: 800.0,
          range: 20.0,
          radius: 0.0,
          shadows_enabled: false,
          shadow_depth_bias: 0.02,
          shadow_normal_bias: 0.6,
          outer_angle: 0.7853982,
          inner_angle: 0.0,
        },
        struct
      );
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), SpotLight.prototype)
    ))();

  if (!window.hasOwnProperty("bevyPbr")) {
    window.bevyPbr = {};
  }
  if (!window.bevyPbr.hasOwnProperty("light")) {
    window.bevyPbr.light = {};
  }
  Object.assign(window.bevyPbr.light, {
    AmbientLight,
    DirectionalLight,
    DirectionalLightShadowMap,
    PointLight,
    PointLightShadowMap,
    SpotLight,
  });
})(globalThis);
