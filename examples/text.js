// This example illustrates how to create UI text and update it in a system.
//
// It displays the current FPS in the top left corner, as well as text that changes color
// in the bottom right. For text within a scene, please see the text2d example.

import { Entity } from "../js/bevy.js";
import { Visibility } from "../js/generated/bevy/render/view/visibility.js";
import { FocusPolicy } from "../js/generated/bevy/ui/focus.js";
import {
  Node,
  CalculatedSize,
  Style,
  AlignSelf,
  PositionType,
  Val,
} from "../js/generated/bevy/ui/uiNode.js";
import { UiRect } from "../js/generated/bevy/ui/geometry.js";
import { Transform } from "../js/generated/bevy/transform/components/transform.js";
import { GlobalTransform } from "../js/generated/bevy/transform/components/globalTransform.js";

(async () => {
  await setup();
})();

async function setup() {
  await Bevy.system();

  let _handle = Bevy.asset.AssetServer.load("fonts/FiraSans-Bold.ttf");

  let entity = new Entity(0);
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
  entity.insert(new Node());
  entity.insert(new CalculatedSize());
  entity.insert(FocusPolicy.Pass());
  entity.insert(new Transform());
  entity.insert(new GlobalTransform());
  entity.insert(new Visibility());
}
