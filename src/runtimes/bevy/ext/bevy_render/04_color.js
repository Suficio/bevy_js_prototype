"use strict";
((window) => {
  const { ReflectableEnum, ReflectableObject, TypeRegistry, worldResourceId } =
    window.bevyEcs;
  class ColorRgba extends ReflectableObject {
    static typeName = "bevy_render::color::Color";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super(null, struct);
    }
  }
  class ColorRgbaLinear extends ReflectableObject {
    static typeName = "bevy_render::color::Color";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super(null, struct);
    }
  }
  class ColorHsla extends ReflectableObject {
    static typeName = "bevy_render::color::Color";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(struct) {
      super(null, struct);
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

    static AliceBlue = () => Color.Rgb(0.94, 0.97, 1.0);
    static AntiqueWhite = () => Color.Rgb(0.98, 0.92, 0.84);
    static Aquamarine = () => Color.Rgb(0.49, 1.0, 0.83);
    static Azure = () => Color.Rgb(0.94, 1.0, 1.0);
    static Beige = () => Color.Rgb(0.96, 0.96, 0.86);
    static Bisque = () => Color.Rgb(1.0, 0.89, 0.77);
    static Black = () => Color.Rgb(0.0, 0.0, 0.0);
    static Blue = () => Color.Rgb(0.0, 0.0, 1.0);
    static Crimson = () => Color.Rgb(0.86, 0.08, 0.24);
    static Cyan = () => Color.Rgb(0.0, 1.0, 1.0);
    static DarkGray = () => Color.Rgb(0.25, 0.25, 0.25);
    static DarkGreen = () => Color.Rgb(0.0, 0.5, 0.0);
    static Fuchsia = () => Color.Rgb(1.0, 0.0, 1.0);
    static Gold = () => Color.Rgb(1.0, 0.84, 0.0);
    static Gray = () => Color.Rgb(0.5, 0.5, 0.5);
    static Green = () => Color.Rgb(0.0, 1.0, 0.0);
    static Indigo = () => Color.Rgb(0.29, 0.0, 0.51);
    static LimeGreen = () => Color.Rgb(0.2, 0.8, 0.2);
    static Maroon = () => Color.Rgb(0.5, 0.0, 0.0);
    static MidnightBlue = () => Color.Rgb(0.1, 0.1, 0.44);
    static Navy = () => Color.Rgb(0.0, 0.0, 0.5);
    static None = () => Color.Rgba(0.0, 0.0, 0.0, 0.0);
    static Olive = () => Color.Rgb(0.5, 0.5, 0.0);
    static Orange = () => Color.Rgb(1.0, 0.65, 0.0);
    static OrangeRed = () => Color.Rgb(1.0, 0.27, 0.0);
    static Pink = () => Color.Rgb(1.0, 0.08, 0.58);
    static Purple = () => Color.Rgb(0.5, 0.0, 0.5);
    static Red = () => Color.Rgb(1.0, 0.0, 0.0);
    static Salmon = () => Color.Rgb(0.98, 0.5, 0.45);
    static SeaGreen = () => Color.Rgb(0.18, 0.55, 0.34);
    static Silver = () => Color.Rgb(0.75, 0.75, 0.75);
    static Teal = () => Color.Rgb(0.0, 0.5, 0.5);
    static Tomato = () => Color.Rgb(1.0, 0.39, 0.28);
    static Turquoise = () => Color.Rgb(0.25, 0.88, 0.82);
    static Violet = () => Color.Rgb(0.93, 0.51, 0.93);
    static White = () => Color.Rgb(1.0, 1.0, 1.0);
    static Yellow = () => Color.Rgb(1.0, 1.0, 0.0);
    static YellowGreen = () => Color.Rgb(0.6, 0.8, 0.2);
    static typeName = "bevy_render::color::Color";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    constructor(type, value) {
      super(type, value);
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
