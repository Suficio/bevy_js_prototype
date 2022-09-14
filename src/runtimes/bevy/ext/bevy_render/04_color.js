"use strict";
((window) => {
  const { ReflectableEnum, ReflectableObject } = window.bevyEcs;
  class ColorRgba extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_render::color::Color";
    }
  }
  class ColorRgbaLinear extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_render::color::Color";
    }
  }
  class ColorHsla extends ReflectableObject {
    constructor(struct) {
      super(null, struct);
    }
    static typeName() {
      return "bevy_render::color::Color";
    }
  }
  class Color extends ReflectableEnum {
    static Rgba = (defaults, struct) =>
      new Color("Rgba", new ColorRgba(defaults, struct));
    static RgbaLinear = (defaults, struct) =>
      new Color("RgbaLinear", new ColorRgbaLinear(defaults, struct));
    static Hsla = (defaults, struct) =>
      new Color("Hsla", new ColorHsla(defaults, struct));
    constructor(type, value) {
      super(type, value);
    }
    static typeName() {
      return "bevy_render::color::Color";
    }
  }
  if (!window.hasOwnProperty("bevyRender")) {
    window.bevyRender = {};
  }
  if (!window.bevyRender.hasOwnProperty("color")) {
    window.bevyRender.color = {};
  }
  Object.assign(window.bevyRender.color, { Color });
})(globalThis);
