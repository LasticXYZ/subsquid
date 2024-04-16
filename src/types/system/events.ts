import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as coretimeRococoV9430 from '../coretimeRococoV9430'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     * An extrinsic completed successfully.
     */
    coretimeRococoV9430: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: coretimeRococoV9430.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     * An extrinsic failed.
     */
    coretimeRococoV9430: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: coretimeRococoV9430.DispatchError,
            dispatchInfo: coretimeRococoV9430.DispatchInfo,
        })
    ),
}
