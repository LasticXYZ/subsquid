import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v1002000 from '../v1002000'
import * as v1002004 from '../v1002004'

export const asMultiThreshold1 =  {
    name: 'Multisig.as_multi_threshold_1',
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    v1002000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1002000.AccountId32),
            call: v1002000.Call,
        })
    ),
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    v1002004: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => v1002004.AccountId32),
            call: v1002004.Call,
        })
    ),
}

export const asMulti =  {
    name: 'Multisig.as_multi',
    /**
     * See [`Pallet::as_multi`].
     */
    v1002000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1002000.AccountId32),
            maybeTimepoint: sts.option(() => v1002000.Timepoint),
            call: v1002000.Call,
            maxWeight: v1002000.Weight,
        })
    ),
    /**
     * See [`Pallet::as_multi`].
     */
    v1002004: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1002004.AccountId32),
            maybeTimepoint: sts.option(() => v1002004.Timepoint),
            call: v1002004.Call,
            maxWeight: v1002004.Weight,
        })
    ),
}

export const approveAsMulti =  {
    name: 'Multisig.approve_as_multi',
    /**
     * See [`Pallet::approve_as_multi`].
     */
    v1002000: new CallType(
        'Multisig.approve_as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1002000.AccountId32),
            maybeTimepoint: sts.option(() => v1002000.Timepoint),
            callHash: sts.bytes(),
            maxWeight: v1002000.Weight,
        })
    ),
}

export const cancelAsMulti =  {
    name: 'Multisig.cancel_as_multi',
    /**
     * See [`Pallet::cancel_as_multi`].
     */
    v1002000: new CallType(
        'Multisig.cancel_as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => v1002000.AccountId32),
            timepoint: v1002000.Timepoint,
            callHash: sts.bytes(),
        })
    ),
}
