import assert from "assert"
import * as marshal from "./marshal"
import {RegionId} from "./_regionId"

export class RegionIdPair {
    private _first!: RegionId
    private _second!: RegionId

    constructor(props?: Partial<Omit<RegionIdPair, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._first = new RegionId(undefined, marshal.nonNull(json.first))
            this._second = new RegionId(undefined, marshal.nonNull(json.second))
        }
    }

    get first(): RegionId {
        assert(this._first != null, 'uninitialized access')
        return this._first
    }

    set first(value: RegionId) {
        this._first = value
    }

    get second(): RegionId {
        assert(this._second != null, 'uninitialized access')
        return this._second
    }

    set second(value: RegionId) {
        this._second = value
    }

    toJSON(): object {
        return {
            first: this.first.toJSON(),
            second: this.second.toJSON(),
        }
    }
}
