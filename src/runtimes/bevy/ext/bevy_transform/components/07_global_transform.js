"use strict";
((window) => {
  const { ReflectableArray, ReflectableObject, TypeRegistry, worldResourceId } =
    window.Bevy.ecs;
  const { Affine3A } = window.glam.f32.affine3A;
  const { Mat3A } = window.glam.f32.sse2.mat3A;
  const { Vec3A } = window.glam.f32.sse2.vec3A;

  class GlobalTransform extends ReflectableArray {
    static typeName =
      "bevy_transform::components::global_transform::GlobalTransform";
    static typeId = TypeRegistry.getTypeIdWithName(
      worldResourceId,
      this.typeName
    );
    static componentId = TypeRegistry.getComponentId(
      worldResourceId,
      this.typeId
    );

    constructor(seq) {
      super(
        [
          new Affine3A({
            matrix3: new Mat3A({
              x_axis: new Vec3A({ x: 1.0, y: 0.0, z: 0.0 }),
              y_axis: new Vec3A({ x: 0.0, y: 1.0, z: 0.0 }),
              z_axis: new Vec3A({ x: 0.0, y: 0.0, z: 1.0 }),
            }),
            translation: new Vec3A({ x: 0.0, y: 0.0, z: 0.0 }),
          }),
        ],
        seq
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
  if (!window.Bevy.transform.components.hasOwnProperty("globalTransform")) {
    window.Bevy.transform.components.globalTransform = {};
  }

  Object.assign(window.Bevy.transform.components.globalTransform, {
    GlobalTransform,
  });
})(globalThis);
