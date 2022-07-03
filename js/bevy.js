"use strict";

const { Reflectable, World, Entity } = Bevy;
export { Reflectable, World, Entity };

export class ReflectableStruct extends Reflectable {
    constructor(type, def, struct) {
        super(type);
        this.struct = Object.seal(Object.assign({}, def));
        if (struct) {
            Object.assign(this.struct, struct);
        }
    }

    reflectUntyped() {
        const reflected = {};
        for (let property in this.struct) {
            const element = this.struct[property];
            if (element instanceof Reflectable) {
                reflected[property] = element.reflectUntyped();
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
            this.tuple_struct = Object.seal(Object.assign([], defaults));
            if (seq) {
                if (!(seq instanceof Array)) {
                    seq = [seq];
                }
                Object.assign(this.tuple_struct, seq);
            }
        }
    }

    reflectUntyped() {
        const len = this.tuple_struct.length;
        if (len === 0) {
            return null
        } else if (len === 1) {
            const element = this.tuple_struct[0];
            if (element instanceof Reflectable) {
                return element.reflectUntyped()
            } else {
                return element;
            }
        } else {
            const reflected = [];
            for (let i = 0; i < len; i++) {
                const element = this.tuple_struct[i];
                if (element instanceof Reflectable) {
                    reflected[i] = element.reflectUntyped()
                } else {
                    reflected[i] = element;
                }
            }
            return reflected;
        }
    }
}

export class ReflectableEnumEntry extends ReflectableTupleStruct {
}

export class ReflectableEnum extends Reflectable {
    constructor(type, value) {
        super(type);
        this.value = value;
    }

    reflectUntyped() {
        const type = this.type;
        const value = this.value;

        const reflected = {};
        if (value === undefined) {
            reflected[type] = null;
        } else if (value instanceof ReflectableEnumEntry) {
            reflected[value.type] = value.reflectUntyped();
        } else {
            reflected[type] = value;
        }
        return reflected;
    }
}
