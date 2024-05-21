import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v9430 from '../v9430'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     * An extrinsic completed successfully.
     */
    v9430: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v9430.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     * An extrinsic failed.
     */
    v9430: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v9430.DispatchError,
            dispatchInfo: v9430.DispatchInfo,
        })
    ),
}
