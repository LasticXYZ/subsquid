import assert from "assert"
import * as marshal from "./marshal"
import {CoreAssignmentKind} from "./_coreAssignmentKind"

export class CoreAssignment {
    private _kind!: CoreAssignmentKind
    private _value!: number | undefined | null

    constructor(props?: Partial<Omit<CoreAssignment, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._kind = marshal.enumFromJson(json.kind, CoreAssignmentKind)
            this._value = json.value == null ? undefined : marshal.int.fromJSON(json.value)
        }
    }

    get kind(): CoreAssignmentKind {
        assert(this._kind != null, 'uninitialized access')
        return this._kind
    }

    set kind(value: CoreAssignmentKind) {
        this._kind = value
    }

    get value(): number | undefined | null {
        return this._value
    }

    set value(value: number | undefined | null) {
        this._value = value
    }

    toJSON(): object {
        return {
            kind: this.kind,
            value: this.value,
        }
    }
}
