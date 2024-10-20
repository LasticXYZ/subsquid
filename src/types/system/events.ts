import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1003000 from '../v1003000'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     * An extrinsic completed successfully.
     */
    v1003000: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v1003000.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     * An extrinsic failed.
     */
    v1003000: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v1003000.DispatchError,
            dispatchInfo: v1003000.DispatchInfo,
        })
    ),
}
