import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v268 from '../v268'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     * An extrinsic completed successfully.
     */
    v268: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v268.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     * An extrinsic failed.
     */
    v268: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v268.DispatchError,
            dispatchInfo: v268.DispatchInfo,
        })
    ),
}
