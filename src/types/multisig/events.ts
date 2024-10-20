import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1003000 from '../v1003000'

export const newMultisig =  {
    name: 'Multisig.NewMultisig',
    /**
     * A new multisig operation has begun.
     */
    v1003000: new EventType(
        'Multisig.NewMultisig',
        sts.struct({
            approving: v1003000.AccountId32,
            multisig: v1003000.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}

export const multisigApproval =  {
    name: 'Multisig.MultisigApproval',
    /**
     * A multisig operation has been approved by someone.
     */
    v1003000: new EventType(
        'Multisig.MultisigApproval',
        sts.struct({
            approving: v1003000.AccountId32,
            timepoint: v1003000.Timepoint,
            multisig: v1003000.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}

export const multisigExecuted =  {
    name: 'Multisig.MultisigExecuted',
    /**
     * A multisig operation has been executed.
     */
    v1003000: new EventType(
        'Multisig.MultisigExecuted',
        sts.struct({
            approving: v1003000.AccountId32,
            timepoint: v1003000.Timepoint,
            multisig: v1003000.AccountId32,
            callHash: sts.bytes(),
            result: sts.result(() => sts.unit(), () => v1003000.DispatchError),
        })
    ),
}

export const multisigCancelled =  {
    name: 'Multisig.MultisigCancelled',
    /**
     * A multisig operation has been cancelled.
     */
    v1003000: new EventType(
        'Multisig.MultisigCancelled',
        sts.struct({
            cancelling: v1003000.AccountId32,
            timepoint: v1003000.Timepoint,
            multisig: v1003000.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}
