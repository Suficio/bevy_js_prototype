// This example illustrates how to create UI text and update it in a system.
//
// It displays the current FPS in the top left corner, as well as text that changes color
// in the bottom right. For text within a scene, please see the text2d example.

const { worldResourceId } = Bevy.ecs;

const { Entity, World, Query, With } = Bevy.ecs;
const { Visibility, ComputedVisibility } = Bevy.render.view.visibility;
const { FocusPolicy } = Bevy.ui.focus;
const { TextBundle } = Bevy.ui.entity;
const { Node, CalculatedSize, Style, AlignSelf, PositionType, Val } =
  Bevy.ui.uiNode;
const { UiRect } = Bevy.ui.geometry;
const { Transform } = Bevy.transform.components.transform;
const { GlobalTransform } = Bevy.transform.components.globalTransform;
const { Affine3A } = glam.f32.affine3A;
const {
  Text,
  HorizontalAlign,
  TextAlignment,
  TextSection,
  VerticalAlign,
  TextStyle,
} = Bevy.text.text;
const { Color } = Bevy.render.color;
const { Vec } = alloc.vec;
const { Time } = Bevy.time.time;

class ColorText {}
class FpsText {}

(async () => {
  const world = new World(worldResourceId);

  setup(world);

  let queryColorText = new Query(worldResourceId, Text, new With(ColorText));
  let queryFpsText = new Query(worldResourceId, Text, new With(FpsText));

  while (true) {
    await Bevy.ecs.nextFrame();

    textColorSystem(queryColorText);
    textUpdateSystem(queryFpsText);
  }
})();

function setup(world) {
  // Text with one section
  world.spawn([
    TextBundle.fromSection(
      "hello\nbevy_js!",
      new TextStyle({
        font: Bevy.asset.AssetServer.load("fonts/FiraSans-Bold.ttf"),
        font_size: 100.0,
        color: Color.White(),
      })
    )
      .withTextAlignment(TextAlignment.TopCenter())
      .withStyle(
        new Style({
          position_type: PositionType.Absolute(),
          position: new UiRect({
            bottom: Val.Px(5.0),
            right: Val.Px(15.0),
          }),
        })
      ),
    new ColorText(),
  ]);

  // Text with multiple sections
  world.spawn([
    TextBundle.fromSections([
      new TextSection({
        value: "FPS: ",
        style: new TextStyle({
          font: Bevy.asset.AssetServer.load("fonts/FiraSans-Bold.ttf"),
          font_size: 60.0,
          color: Color.White(),
        }),
      }),
      TextSection.fromStyle(
        new TextStyle({
          font: Bevy.asset.AssetServer.load("fonts/FiraMono-Medium.ttf"),
          font_size: 60.0,
          color: Color.Gold(),
        })
      ),
    ]),
    new FpsText(),
  ]);
}

function textColorSystem(query) {
  query.iter((entity, [text]) => {
    const seconds = Time.secondsSinceStartup();

    text.sections[0].style.color = Color.Rgba(
      Math.sin(1.25 * seconds) / 2 + 0.5,
      Math.sin(0.75 * seconds) / 2 + 0.5,
      Math.sin(0.5 * seconds) / 2 + 0.5,
      1.0
    );

    entity.insert(text);
  });
}

function textUpdateSystem(query) {}
