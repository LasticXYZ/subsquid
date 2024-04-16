import assert from "assert"
import * as marshal from "./marshal"

export class Timepoint {
    private _height!: number
    private _index!: number

    constructor(props?: Partial<Omit<Timepoint, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._height = marshal.int.fromJSON(json.height)
            this._index = marshal.int.fromJSON(json.index)
        }
    }

    get height(): number {
        assert(this._height != null, 'uninitialized access')
        return this._height
    }

    set height(value: number) {
        this._height = value
    }

    get index(): number {
        assert(this._index != null, 'uninitialized access')
        return this._index
    }

    set index(value: number) {
        this._index = value
    }

    toJSON(): object {
        return {
            height: this.height,
            index: this.index,
        }
    }
}
