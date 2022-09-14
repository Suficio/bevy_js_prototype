// This example illustrates how to create UI text and update it in a system.
//
// It displays the current FPS in the top left corner, as well as text that changes color
// in the bottom right. For text within a scene, please see the text2d example.

const { Entity, World } = bevyEcs;
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
  await bevyEcs.waitForWorld();
  setup();
})();

function setup() {
  const handle = bevyAsset.AssetServer.load("fonts/FiraSans-Bold.ttf");

  const entity = World.spawn();
  entity
    .insert(new Node())
    .insert(
      new Style({
        align_self: AlignSelf.FlexEnd(),
        position_type: PositionType.Absolute(),
        position: new UiRect({
          bottom: Val.Px(5.0),
          right: Val.Px(15.0),
        }),
      })
    )
    .insert(
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
    )
    .insert(new CalculatedSize())
    .insert(FocusPolicy.Pass())
    .insert(new Transform())
    .insert(new GlobalTransform())
    .insert(new Visibility())
    .insert(
      new ComputedVisibility({
        is_visible_in_hierarchy: false,
        is_visible_in_view: false,
      })
    );
}
