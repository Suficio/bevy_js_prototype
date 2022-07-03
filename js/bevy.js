const { Reflectable, World, Entity } = Bevy;
export { Reflectable, World, Entity };

const { ObjectAssign, ObjectSeal } = Deno;

export class ReflectableStruct extends Reflectable {
    constructor(type, def, struct) {
        super(type);

        this.struct = ObjectSeal({}, def);
        if (struct) {
            ObjectAssign(this.struct, struct);
        }
    }

    reflect_untyped() {
        const reflected = {};
        for (let property in this.struct) {
            const element = this.struct[property];
            if (element instanceof Reflectable) {
                reflected[property] = element.reflect_untyped();
            } else {
                reflected[property] = element;
            }
        }
    }
}

export class ReflectableEnum extends Reflectable {
    constructor(type, variant, associated) {
        super(type);

        this.variant = variant;

        if (associated) {
            if (!(associated instanceof Reflectable)) {
                throw new Error("Enum associated type must be an instance of Reflectable");
            }
            this.associated = associated;
        } else {
            this.associated = null;
        }
    }

    toString() {
        throw new Error("ReflectableEnum must implement toString");
    }

    reflect_untyped() {
        const reflected = {};
        reflected[this.toString()] = this.associated;
        return reflected
    }
}