import assert from "assert"
import * as marshal from "./marshal"

export class RegionId {
    private _begin!: number
    private _core!: number
    private _mask!: string

    constructor(props?: Partial<Omit<RegionId, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._begin = marshal.int.fromJSON(json.begin)
            this._core = marshal.int.fromJSON(json.core)
            this._mask = marshal.string.fromJSON(json.mask)
        }
    }

    get begin(): number {
        assert(this._begin != null, 'uninitialized access')
        return this._begin
    }

    set begin(value: number) {
        this._begin = value
    }

    get core(): number {
        assert(this._core != null, 'uninitialized access')
        return this._core
    }

    set core(value: number) {
        this._core = value
    }

    get mask(): string {
        assert(this._mask != null, 'uninitialized access')
        return this._mask
    }

    set mask(value: string) {
        this._mask = value
    }

    toJSON(): object {
        return {
            begin: this.begin,
            core: this.core,
            mask: this.mask,
        }
    }
}
