"use strict";
((window) => {
  const { Bundle } = window.bevyEcs;
  const { Visibility, ComputedVisibility } = bevyRender.view.visibility;
  const { FocusPolicy } = bevyUi.focus;
  const { Node, CalculatedSize, Style } = bevyUi.uiNode;
  const { Transform } = bevyTransform.components.transform;
  const { GlobalTransform } = bevyTransform.components.globalTransform;
  const { Text } = bevyText.text;

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

  if (!window.hasOwnProperty("bevyUi")) {
    window.bevyUi = {};
  }
  if (!window.bevyUi.hasOwnProperty("entity")) {
    window.bevyUi.entity = {};
  }
  Object.assign(window.bevyUi.entity, { TextBundle });
})(globalThis);
