import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1020 from '../v1020'
import * as v1032 from '../v1032'
import * as v1058 from '../v1058'
import * as v1062 from '../v1062'
import * as v9111 from '../v9111'
import * as v9160 from '../v9160'
import * as v9170 from '../v9170'
import * as v9190 from '../v9190'
import * as v9291 from '../v9291'
import * as v9320 from '../v9320'
import * as v9420 from '../v9420'
import * as v9430 from '../v9430'

export const extrinsicSuccess =  {
    name: 'System.ExtrinsicSuccess',
    /**
     *  An extrinsic completed successfully.
     */
    v1020: new EventType(
        'System.ExtrinsicSuccess',
        v1020.DispatchInfo
    ),
    /**
     *  An extrinsic completed successfully.
     */
    v1058: new EventType(
        'System.ExtrinsicSuccess',
        v1058.DispatchInfo
    ),
    /**
     *  An extrinsic completed successfully.
     */
    v1062: new EventType(
        'System.ExtrinsicSuccess',
        v1062.DispatchInfo
    ),
    /**
     * An extrinsic completed successfully.
     */
    v9160: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v9160.DispatchInfo,
        })
    ),
    /**
     * An extrinsic completed successfully.
     */
    v9291: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v9291.DispatchInfo,
        })
    ),
    /**
     * An extrinsic completed successfully.
     */
    v9320: new EventType(
        'System.ExtrinsicSuccess',
        sts.struct({
            dispatchInfo: v9320.DispatchInfo,
        })
    ),
}

export const extrinsicFailed =  {
    name: 'System.ExtrinsicFailed',
    /**
     *  An extrinsic failed.
     */
    v1020: new EventType(
        'System.ExtrinsicFailed',
        sts.tuple([v1020.DispatchError, v1020.DispatchInfo])
    ),
    /**
     *  An extrinsic failed.
     */
    v1032: new EventType(
        'System.ExtrinsicFailed',
        sts.tuple([v1032.DispatchError, v1032.DispatchInfo])
    ),
    /**
     *  An extrinsic failed.
     */
    v1058: new EventType(
        'System.ExtrinsicFailed',
        sts.tuple([v1058.DispatchError, v1058.DispatchInfo])
    ),
    /**
     *  An extrinsic failed.
     */
    v1062: new EventType(
        'System.ExtrinsicFailed',
        sts.tuple([v1062.DispatchError, v1062.DispatchInfo])
    ),
    /**
     * An extrinsic failed. \[error, info\]
     */
    v9111: new EventType(
        'System.ExtrinsicFailed',
        sts.tuple([v9111.DispatchError, v9111.DispatchInfo])
    ),
    /**
     * An extrinsic failed.
     */
    v9160: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v9160.DispatchError,
            dispatchInfo: v9160.DispatchInfo,
        })
    ),
    /**
     * An extrinsic failed.
     */
    v9170: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v9170.DispatchError,
            dispatchInfo: v9170.DispatchInfo,
        })
    ),
    /**
     * An extrinsic failed.
     */
    v9190: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v9190.DispatchError,
            dispatchInfo: v9190.DispatchInfo,
        })
    ),
    /**
     * An extrinsic failed.
     */
    v9291: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v9291.DispatchError,
            dispatchInfo: v9291.DispatchInfo,
        })
    ),
    /**
     * An extrinsic failed.
     */
    v9320: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v9320.DispatchError,
            dispatchInfo: v9320.DispatchInfo,
        })
    ),
    /**
     * An extrinsic failed.
     */
    v9420: new EventType(
        'System.ExtrinsicFailed',
        sts.struct({
            dispatchError: v9420.DispatchError,
            dispatchInfo: v9420.DispatchInfo,
        })
    ),
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
