"use strict";
((window) => {
  const {
    Reflect,
    ReflectableEnum,
    ReflectableUnit,
    waitForWorld,
    worldResourceId,
  } = window.bevyEcs;
  class ImageModeKeepAspect extends ReflectableUnit {
    static typeName = "bevy_ui::widget::image::ImageMode";
    static typeId = new Uint8Array(8);
    constructor() {
      super("KeepAspect");
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ImageMode.prototype)
    ))();
  class ImageMode extends ReflectableEnum {
    static KeepAspect = () => new ImageModeKeepAspect();
    static typeName = "bevy_ui::widget::image::ImageMode";
    static typeId = new Uint8Array(8);
    constructor(type, value) {
      super(type, value);
    }
  }
  (() =>
    waitForWorld().then(() =>
      Reflect.assignTypeId(worldResourceId(), ImageMode.prototype)
    ))();

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
