"use strict";
((window) => {
  const { ReflectableEnum, ReflectableUnit, TypeRegistry, worldResourceId } =
    window.bevyEcs;

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

  if (!window.hasOwnProperty("bevyUi")) {
    window.bevyUi = {};
  }
  if (!window.bevyUi.hasOwnProperty("widget")) {
    window.bevyUi.widget = {};
  }
  if (!window.bevyUi.widget.hasOwnProperty("image")) {
    window.bevyUi.widget.image = {};
  }
  Object.assign(window.bevyUi.widget.image, { ImageMode });
})(globalThis);
