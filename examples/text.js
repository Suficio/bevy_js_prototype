// This example illustrates how to create UI text and update it in a system.
//
// It displays the current FPS in the top left corner, as well as text that changes color
// in the bottom right. For text within a scene, please see the text2d example.

import { Entity } from "../js/bevy.js";
import {
  Visibility,
  ComputedVisibility,
} from "../js/bevy/render/view/visibility.js";
import { FocusPolicy } from "../js/bevy/ui/focus.js";
import {
  Node,
  CalculatedSize,
  Style,
  AlignSelf,
  PositionType,
  Val,
  Display,
} from "../js/bevy/ui/uiNode.js";
import { UiRect } from "../js/bevy/ui/geometry.js";
import { Transform } from "../js/bevy/transform/components/transform.js";
import { GlobalTransform } from "../js/bevy/transform/components/globalTransform.js";
import { Affine3A } from "../js/glam/f32/affine3a.js";
import {
  Text,
  HorizontalAlign,
  TextAlignment,
  TextSection,
  VerticalAlign,
  TextStyle,
} from "../js/bevy/text/text.js";
import { Color } from "../js/bevy/render/color.js";
import { Vec } from "../js/alloc/vec.js";

(async () => {
  await setup();
})();

async function setup() {
  await Bevy.system();

  let handle = Bevy.asset.AssetServer.load("fonts/FiraSans-Bold.ttf");

  let entity = new Entity(0);
  entity.insert(new Node());
  entity.insert(
    new Style({
      align_self: AlignSelf.FlexEnd(),
      position_type: PositionType.Absolute(),
      position: new UiRect({
        bottom: Val.Px(5.0),
        right: Val.Px(15.0),
      }),
    })
  );
  entity.insert(
    new Text({
      sections: new Vec([
        new TextSection({
          value: "hello\nbevy_js!",
          style: new TextStyle({
            font: handle,
            font_size: 100.0,
            color: Color.Rgba({
              red: 1.0,
              green: 1.0,
              blue: 1.0,
              alpha: 1.0,
            }),
          }),
        }),
      ]),
      alignment: new TextAlignment({
        vertical: VerticalAlign.Top(),
        horizontal: HorizontalAlign.Center(),
      }),
    })
  );
  entity.insert(new CalculatedSize());
  entity.insert(FocusPolicy.Pass());
  entity.insert(new Transform());
  entity.insert(new GlobalTransform(Affine3A.Identity()));
  entity.insert(new Visibility());
  entity.insert(
    new ComputedVisibility({
      is_visible_in_hierarchy: false,
      is_visible_in_view: false,
    })
  );
}
