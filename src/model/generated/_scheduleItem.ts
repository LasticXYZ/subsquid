import assert from "assert"
import * as marshal from "./marshal"
import {CoreAssignment} from "./_coreAssignment"

export class ScheduleItem {
    private _mask!: string
    private _assignment!: CoreAssignment

    constructor(props?: Partial<Omit<ScheduleItem, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._mask = marshal.string.fromJSON(json.mask)
            this._assignment = new CoreAssignment(undefined, marshal.nonNull(json.assignment))
        }
    }

    get mask(): string {
        assert(this._mask != null, 'uninitialized access')
        return this._mask
    }

    set mask(value: string) {
        this._mask = value
    }

    get assignment(): CoreAssignment {
        assert(this._assignment != null, 'uninitialized access')
        return this._assignment
    }

    set assignment(value: CoreAssignment) {
        this._assignment = value
    }

    toJSON(): object {
        return {
            mask: this.mask,
            assignment: this.assignment.toJSON(),
        }
    }
}
