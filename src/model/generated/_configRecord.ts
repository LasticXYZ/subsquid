import assert from "assert"
import * as marshal from "./marshal"

export class ConfigRecord {
    private _advanceNotice!: number
    private _interludeLength!: number
    private _leadinLength!: number
    private _regionLength!: number
    private _idealBulkProportion!: number
    private _limitCoresOffered!: number | undefined | null
    private _renewalBump!: number
    private _contributionTimeout!: number

    constructor(props?: Partial<Omit<ConfigRecord, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._advanceNotice = marshal.int.fromJSON(json.advanceNotice)
            this._interludeLength = marshal.int.fromJSON(json.interludeLength)
            this._leadinLength = marshal.int.fromJSON(json.leadinLength)
            this._regionLength = marshal.int.fromJSON(json.regionLength)
            this._idealBulkProportion = marshal.int.fromJSON(json.idealBulkProportion)
            this._limitCoresOffered = json.limitCoresOffered == null ? undefined : marshal.int.fromJSON(json.limitCoresOffered)
            this._renewalBump = marshal.int.fromJSON(json.renewalBump)
            this._contributionTimeout = marshal.int.fromJSON(json.contributionTimeout)
        }
    }

    get advanceNotice(): number {
        assert(this._advanceNotice != null, 'uninitialized access')
        return this._advanceNotice
    }

    set advanceNotice(value: number) {
        this._advanceNotice = value
    }

    get interludeLength(): number {
        assert(this._interludeLength != null, 'uninitialized access')
        return this._interludeLength
    }

    set interludeLength(value: number) {
        this._interludeLength = value
    }

    get leadinLength(): number {
        assert(this._leadinLength != null, 'uninitialized access')
        return this._leadinLength
    }

    set leadinLength(value: number) {
        this._leadinLength = value
    }

    get regionLength(): number {
        assert(this._regionLength != null, 'uninitialized access')
        return this._regionLength
    }

    set regionLength(value: number) {
        this._regionLength = value
    }

    get idealBulkProportion(): number {
        assert(this._idealBulkProportion != null, 'uninitialized access')
        return this._idealBulkProportion
    }

    set idealBulkProportion(value: number) {
        this._idealBulkProportion = value
    }

    get limitCoresOffered(): number | undefined | null {
        return this._limitCoresOffered
    }

    set limitCoresOffered(value: number | undefined | null) {
        this._limitCoresOffered = value
    }

    get renewalBump(): number {
        assert(this._renewalBump != null, 'uninitialized access')
        return this._renewalBump
    }

    set renewalBump(value: number) {
        this._renewalBump = value
    }

    get contributionTimeout(): number {
        assert(this._contributionTimeout != null, 'uninitialized access')
        return this._contributionTimeout
    }

    set contributionTimeout(value: number) {
        this._contributionTimeout = value
    }

    toJSON(): object {
        return {
            advanceNotice: this.advanceNotice,
            interludeLength: this.interludeLength,
            leadinLength: this.leadinLength,
            regionLength: this.regionLength,
            idealBulkProportion: this.idealBulkProportion,
            limitCoresOffered: this.limitCoresOffered,
            renewalBump: this.renewalBump,
            contributionTimeout: this.contributionTimeout,
        }
    }
}
