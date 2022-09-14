// This example illustrates how to create UI text and update it in a system.
//
// It displays the current FPS in the top left corner, as well as text that changes color
// in the bottom right. For text within a scene, please see the text2d example.

const { Entity, World } = bevyEcs;
const { Visibility, ComputedVisibility } = bevyRender.view.visibility;
const { FocusPolicy } = bevyUi.focus;
const { TextBundle } = bevyUi.entity;
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

  /// Track texts by tracking entity ID
  const colorText = World.spawn();
  const fpsText = World.spawn();

  setup(colorText, fpsText);
})();

function setup(colorText, fpsText) {
  // Text with one section
  colorText.insertBundle(
    TextBundle.fromSection(
      "hello\nbevy_js!",
      new TextStyle({
        font: bevyAsset.AssetServer.load("fonts/FiraSans-Bold.ttf"),
        font_size: 100.0,
        color: Color.WHITE,
      })
    )
      .withTextAlignment(TextAlignment.TopCenter())
      .withStyle(
        new Style({
          align_self: AlignSelf.FlexEnd(),
          position_type: PositionType.Absolute(),
          position: new UiRect({
            bottom: Val.Px(5.0),
            right: Val.Px(15.0),
          }),
        })
      )
  );

  // Text with multiple sections
  fpsText.insertBundle(
    TextBundle.fromSections([
      new TextSection({
        value: "FPS: ",
        style: new TextStyle({
          font: bevyAsset.AssetServer.load("fonts/FiraSans-Bold.ttf"),
          font_size: 60.0,
          color: Color.WHITE,
        }),
      }),
      TextSection.fromStyle(
        new TextStyle({
          font: bevyAsset.AssetServer.load("fonts/FiraMono-Medium.ttf"),
          font_size: 60.0,
          color: Color.GOLD,
        })
      ),
    ]).withStyle(
      new Style({
        align_self: AlignSelf.FlexEnd(),
      })
    )
  );
}
