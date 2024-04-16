import assert from "assert"
import * as marshal from "./marshal"

export class ResultType {
    private _kind!: string

    constructor(props?: Partial<Omit<ResultType, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._kind = marshal.string.fromJSON(json.kind)
        }
    }

    get kind(): string {
        assert(this._kind != null, 'uninitialized access')
        return this._kind
    }

    set kind(value: string) {
        this._kind = value
    }

    toJSON(): object {
        return {
            kind: this.kind,
        }
    }
}
