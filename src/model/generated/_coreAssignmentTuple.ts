import assert from "assert"
import * as marshal from "./marshal"
import {CoreAssignment} from "./_coreAssignment"

export class CoreAssignmentTuple {
    private _assignment!: CoreAssignment
    private _value!: number

    constructor(props?: Partial<Omit<CoreAssignmentTuple, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._assignment = new CoreAssignment(undefined, marshal.nonNull(json.assignment))
            this._value = marshal.int.fromJSON(json.value)
        }
    }

    get assignment(): CoreAssignment {
        assert(this._assignment != null, 'uninitialized access')
        return this._assignment
    }

    set assignment(value: CoreAssignment) {
        this._assignment = value
    }

    get value(): number {
        assert(this._value != null, 'uninitialized access')
        return this._value
    }

    set value(value: number) {
        this._value = value
    }

    toJSON(): object {
        return {
            assignment: this.assignment.toJSON(),
            value: this.value,
        }
    }
}
