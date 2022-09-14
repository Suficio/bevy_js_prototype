"use strict";
((window) => {
  const { ReflectableEnum, ReflectableUnit } = window.bevyEcs;
  class ImageModeKeepAspect extends ReflectableUnit {
    constructor() {
      super("KeepAspect");
    }
    static typeName() {
      return "bevy_ui::widget::image::ImageMode";
    }
  }
  class ImageMode extends ReflectableEnum {
    static KeepAspect = () => new ImageModeKeepAspect();
    constructor(type, value) {
      super(type, value);
    }
    static typeName() {
      return "bevy_ui::widget::image::ImageMode";
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
