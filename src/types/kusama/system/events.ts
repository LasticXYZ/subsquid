import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1002000 from '../v1002000'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     * An extrinsic completed successfully.
     */
    v1002000: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v1002000.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     * An extrinsic failed.
     */
    v1002000: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v1002000.DispatchError,
            dispatchInfo: v1002000.DispatchInfo,
        })
    ),
}
