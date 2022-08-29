"use strict";
import {
    ReflectableObject,
} from "./../../../bevy.js";
export class Visibility extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::view::visibility::Visibility", null, {
            is_visible: true,
        }, struct)
    }
    get isVisible() {
        return this.struct.is_visible;
    }
    set isVisible(isVisible) {
        this.struct.is_visible = isVisible
    }
};
export class ComputedVisibility extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::view::visibility::ComputedVisibility", null, null, struct)
    }
    get isVisibleInHierarchy() {
        return this.struct.is_visible_in_hierarchy;
    }
    set isVisibleInHierarchy(isVisibleInHierarchy) {
        this.struct.is_visible_in_hierarchy = isVisibleInHierarchy
    }
    get isVisibleInView() {
        return this.struct.is_visible_in_view;
    }
    set isVisibleInView(isVisibleInView) {
        this.struct.is_visible_in_view = isVisibleInView
    }
};
export class VisibleEntities extends ReflectableObject {
    constructor(struct) {
        super("bevy_render::view::visibility::VisibleEntities", null, null, struct)
    }
};