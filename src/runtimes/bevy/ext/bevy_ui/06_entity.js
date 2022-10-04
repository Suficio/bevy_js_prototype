"use strict";
((window) => {
  const { Bundle } = window.Bevy.ecs;
  const { Visibility, ComputedVisibility } = window.Bevy.render.view.visibility;
  const { FocusPolicy } = window.Bevy.ui.focus;
  const { Node, CalculatedSize, Style } = window.Bevy.ui.uiNode;
  const { Transform } = window.Bevy.transform.components.transform;
  const { GlobalTransform } = window.Bevy.transform.components.globalTransform;
  const { Text } = window.Bevy.text.text;

  class TextBundle extends Bundle {
    static fromSection = (value, style) =>
      new TextBundle({ text: Text.fromSection(value, style) });
    static fromSections = (sections) =>
      new TextBundle({ text: Text.fromSections(sections) });

    constructor(struct) {
      super(
        {
          node: new Node(),
          style: new Style(),
          text: new Text(),
          calculatedSize: new CalculatedSize(),
          focusPolicy: FocusPolicy.Pass(),
          transform: new Transform(),
          globalTransform: new GlobalTransform(),
          visibility: new Visibility(),
          computedVisibility: new ComputedVisibility(),
        },
        struct
      );
    }

    withTextAlignment(alignment) {
      this.text.alignment = alignment;
      return this;
    }
    withStyle(style) {
      this.style = style;
      return this;
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("ui")) {
    window.Bevy.ui = {};
  }
  if (!window.Bevy.ui.hasOwnProperty("entity")) {
    window.Bevy.ui.entity = {};
  }
  Object.assign(window.Bevy.ui.entity, { TextBundle });
})(globalThis);
