"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.Bevy.ecs;
  const { Vec3 } = window.glam.f32.vec3;

  class Transform extends ReflectableObject {
    static typeName = "bevy_transform::components::transform::Transform";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );

    constructor(struct) {
      super(
        {
          translation: new Vec3({ x: 0.0, y: 0.0, z: 0.0 }),
          rotation: [0.0, 0.0, 0.0, 1.0],
          scale: new Vec3({ x: 1.0, y: 1.0, z: 1.0 }),
        },
        struct
      );
    }
  }

  if (!window.hasOwnProperty("Bevy")) {
    window.Bevy = {};
  }
  if (!window.Bevy.hasOwnProperty("transform")) {
    window.Bevy.transform = {};
  }
  if (!window.Bevy.transform.hasOwnProperty("components")) {
    window.Bevy.transform.components = {};
  }
  if (!window.Bevy.transform.components.hasOwnProperty("transform")) {
    window.Bevy.transform.components.transform = {};
  }
  Object.assign(window.Bevy.transform.components.transform, { Transform });
})(globalThis);
