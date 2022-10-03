"use strict";
((window) => {
  const { ReflectableObject, TypeRegistry, worldResourceId } = window.bevyEcs;
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

  if (!window.hasOwnProperty("bevyTransform")) {
    window.bevyTransform = {};
  }
  if (!window.bevyTransform.hasOwnProperty("components")) {
    window.bevyTransform.components = {};
  }
  if (!window.bevyTransform.components.hasOwnProperty("transform")) {
    window.bevyTransform.components.transform = {};
  }
  Object.assign(window.bevyTransform.components.transform, { Transform });
})(globalThis);
