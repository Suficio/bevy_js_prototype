// This example illustrates how to create UI text and update it in a system.
//
// It displays the current FPS in the top left corner, as well as text that changes color
// in the bottom right. For text within a scene, please see the text2d example.

const { Entity } = bevyEcs;
const { Visibility, ComputedVisibility } = bevyRender.view.visibility;
const { FocusPolicy } = bevyUi.focus;
const { Node, CalculatedSize, Style, AlignSelf, PositionType, Val } =
  bevyUi.uiNode;
const { UiRect } = bevyUi.geometry;
const { Transform } = bevyTransform.components.transform;
const { GlobalTransform } = bevyTransform.components.globalTransform;
const { Affine3A } = glam.f32.affine3A;
const {
  Text,
  HorizontalAlign,
  TextAlignment,
  TextSection,
  VerticalAlign,
  TextStyle,
} = bevyText.text;
const { Color } = bevyRender.color;
const { Vec } = alloc.vec;

(async () => {
  await setup();
})();

async function setup() {
  await bevyEcs.system();

  let handle = bevyAsset.AssetServer.load("fonts/FiraSans-Bold.ttf");

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
