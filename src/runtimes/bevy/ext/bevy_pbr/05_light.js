"use strict";
((window) => {
  const { ReflectableObject } = window.bevyEcs.reflect;
  const { OrthographicProjection, ScalingMode, WindowOrigin } =
    window.bevyRender.camera.projection;
  const { Color } = window.bevyRender.color;
  class AmbientLight extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_pbr::light::AmbientLight";
    }
  }
  class DirectionalLight extends ReflectableObject {
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
    typeName() {
      return "bevy_pbr::light::DirectionalLight";
    }
  }
  class DirectionalLightShadowMap extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_pbr::light::DirectionalLightShadowMap";
    }
  }
  class PointLight extends ReflectableObject {
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
    typeName() {
      return "bevy_pbr::light::PointLight";
    }
  }
  class PointLightShadowMap extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    typeName() {
      return "bevy_pbr::light::PointLightShadowMap";
    }
  }
  class SpotLight extends ReflectableObject {
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
    typeName() {
      return "bevy_pbr::light::SpotLight";
    }
  }
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
