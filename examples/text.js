// This example illustrates how to create UI text and update it in a system.
//
// It displays the current FPS in the top left corner, as well as text that changes color
// in the bottom right. For text within a scene, please see the text2d example.

import { Entity } from "../js/bevy";
import { Visibility } from "../js/render";
import { FocusPolicy } from "../js/ui/focus";
import { Node, CalculatedSize, Style, AlignSelf, PositionType, Val } from "../js/ui/ui_node";
import { UiRect } from "../js/ui/geometry";
import { Transform, GlobalTransform } from "../js/transform";

(async () => {
    await setup();
})()

async function setup() {
    await Bevy.system();

    let handle = Bevy.asset.AssetServer.load("fonts/FiraSans-Bold.ttf");
    Deno.core.print(JSON.stringify(handle));

    let entity = new Entity(0);
    entity.insert(new Style({
        align_self: AlignSelf.FlexEnd(),
        position_type: PositionType.Absolute(),
        position: new UiRect(new Val(), {
            bottom: Val.Px(5.0),
            right: Val.Px(15.0),
        }),
    }));
    entity.insert(new Node());
    entity.insert(new CalculatedSize());
    entity.insert(new FocusPolicy());
    entity.insert(new Transform());
    entity.insert(new GlobalTransform());
    entity.insert(new Visibility());
}