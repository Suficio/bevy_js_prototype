export class Reflectable {
    constructor(type) {
        this.type = type;
    }

    reflect() {
        return { type: this.type };
    }

    reflect_untyped() {
        return {}
    }
}

export class ReflectableStruct extends Reflectable {
    constructor(type, defaults, struct) {
        super(type);

        if (defaults) {
            this.struct = ObjectSeal(ObjectAssign({}, defaults));
            if (struct) {
                ObjectAssign(this.struct, struct);
            }
        }
    }

    reflect() {
        return { type: this.type, value: this.reflect_untyped() };
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

        return reflected;
    }
}

export class ReflectableTupleStruct extends Reflectable {
    constructor(type, defaults, seq) {
        super(type);

        if (defaults) {
            this.tuple_struct = ObjectSeal(ObjectAssign([], defaults));
            if (seq) {
                ObjectAssign(this.tuple_struct, seq);
            }
        }
    }

    reflect() {
        return { type: this.type, value: this.reflect_untyped() };
    }

    reflect_untyped() {
        const reflected = [];
        for (let i = 0, len = this.tuple_struct.length; i < len; i++) {
            const element = this.tuple_struct[i];
            if (element instanceof Reflectable) {
                reflected[i] = element.reflect_untyped()
            } else {
                reflected[i] = element;
            }
        }

        return reflected;
    }
}

export class ReflectableEnum extends Reflectable {
    constructor(type, variant, associated) {
        super(type);

        this.variant = variant;

        if (associated) {
            if (!(associated instanceof Reflectable)) {
                throw new Error(
                    "Associated enum data must be an instance of Reflectable"
                );
            }
            this.associated = associated;
        }
    }

    toString() {
        throw new Error("ReflectableEnum must define toString function");
    }

    reflect() {
        return { type: this.type, value: this.reflect_untyped() };
    }

    reflect_untyped() {
        const reflected = {};
        if (this.associated === undefined) {
            reflected[this.toString()] = null;
        } else {
            reflected[this.toString()] = this.associated;
        }
        return reflected;
    }
}