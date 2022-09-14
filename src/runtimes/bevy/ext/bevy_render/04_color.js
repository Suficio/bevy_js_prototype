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
    static Rgba = (red, green, blue, alpha) =>
      new Color("Rgba", new ColorRgba({ red, green, blue, alpha }));
    static RgbaLinear = (red, green, blue, alpha) =>
      new Color("RgbaLinear", new ColorRgbaLinear({ red, green, blue, alpha }));
    static Hsla = (hue, saturation, lightness, alpha) =>
      new Color("Hsla", new ColorHsla(hue, saturation, lightness, alpha));

    static Rgb = (red, green, blue) => Color.Rgba(red, green, blue, 1.0);
    static RgbLinear = (red, green, blue) =>
      Color.RgbaLinear(red, green, blue, 1.0);
    static Hsl = (hue, saturation, lightness) =>
      Color.Hsla(hue, saturation, lightness, 1.0);

    static ALICE_BLUE = Color.Rgb(0.94, 0.97, 1.0);
    static ANTIQUE_WHITE = Color.Rgb(0.98, 0.92, 0.84);
    static AQUAMARINE = Color.Rgb(0.49, 1.0, 0.83);
    static AZURE = Color.Rgb(0.94, 1.0, 1.0);
    static BEIGE = Color.Rgb(0.96, 0.96, 0.86);
    static BISQUE = Color.Rgb(1.0, 0.89, 0.77);
    static BLACK = Color.Rgb(0.0, 0.0, 0.0);
    static BLUE = Color.Rgb(0.0, 0.0, 1.0);
    static CRIMSON = Color.Rgb(0.86, 0.08, 0.24);
    static CYAN = Color.Rgb(0.0, 1.0, 1.0);
    static DARK_GRAY = Color.Rgb(0.25, 0.25, 0.25);
    static DARK_GREEN = Color.Rgb(0.0, 0.5, 0.0);
    static FUCHSIA = Color.Rgb(1.0, 0.0, 1.0);
    static GOLD = Color.Rgb(1.0, 0.84, 0.0);
    static GRAY = Color.Rgb(0.5, 0.5, 0.5);
    static GREEN = Color.Rgb(0.0, 1.0, 0.0);
    static INDIGO = Color.Rgb(0.29, 0.0, 0.51);
    static LIME_GREEN = Color.Rgb(0.2, 0.8, 0.2);
    static MAROON = Color.Rgb(0.5, 0.0, 0.0);
    static MIDNIGHT_BLUE = Color.Rgb(0.1, 0.1, 0.44);
    static NAVY = Color.Rgb(0.0, 0.0, 0.5);
    static NONE = Color.Rgba(0.0, 0.0, 0.0, 0.0);
    static OLIVE = Color.Rgb(0.5, 0.5, 0.0);
    static ORANGE = Color.Rgb(1.0, 0.65, 0.0);
    static ORANGE_RED = Color.Rgb(1.0, 0.27, 0.0);
    static PINK = Color.Rgb(1.0, 0.08, 0.58);
    static PURPLE = Color.Rgb(0.5, 0.0, 0.5);
    static RED = Color.Rgb(1.0, 0.0, 0.0);
    static SALMON = Color.Rgb(0.98, 0.5, 0.45);
    static SEA_GREEN = Color.Rgb(0.18, 0.55, 0.34);
    static SILVER = Color.Rgb(0.75, 0.75, 0.75);
    static TEAL = Color.Rgb(0.0, 0.5, 0.5);
    static TOMATO = Color.Rgb(1.0, 0.39, 0.28);
    static TURQUOISE = Color.Rgb(0.25, 0.88, 0.82);
    static VIOLET = Color.Rgb(0.93, 0.51, 0.93);
    static WHITE = Color.Rgb(1.0, 1.0, 1.0);
    static YELLOW = Color.Rgb(1.0, 1.0, 0.0);
    static YELLOW_GREEN = Color.Rgb(0.6, 0.8, 0.2);

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
