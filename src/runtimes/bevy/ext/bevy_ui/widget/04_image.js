"use strict";
((window) => {
  const { ReflectableEnum, ReflectableUnit, TypeRegistry, worldResourceId } =
    window.Bevy.ecs;

  class ImageModeKeepAspect extends ReflectableUnit {
    static typeName = "bevy_ui::widget::image::ImageMode";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor() {
      super("KeepAspect");
    }
  }
  class ImageMode extends ReflectableEnum {
    static KeepAspect = () => new ImageModeKeepAspect();

    static typeName = "bevy_ui::widget::image::ImageMode";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(type, value) {
      super(type, value);
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("ui")) {
    window.Bevy.ui = {};
  }
  if (!window.Bevy.ui.hasOwnProperty("widget")) {
    window.Bevy.ui.widget = {};
  }
  if (!window.Bevy.ui.widget.hasOwnProperty("image")) {
    window.Bevy.ui.widget.image = {};
  }
  Object.assign(window.Bevy.ui.widget.image, { ImageMode });
})(globalThis);
