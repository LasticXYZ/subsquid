import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1002000 from '../v1002000'

export const newMultisig =  {
    name: 'Multisig.NewMultisig',
    /**
     * A new multisig operation has begun.
     */
    v1002000: new EventType(
        'Multisig.NewMultisig',
        sts.struct({
            approving: v1002000.AccountId32,
            multisig: v1002000.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}

export const multisigApproval =  {
    name: 'Multisig.MultisigApproval',
    /**
     * A multisig operation has been approved by someone.
     */
    v1002000: new EventType(
        'Multisig.MultisigApproval',
        sts.struct({
            approving: v1002000.AccountId32,
            timepoint: v1002000.Timepoint,
            multisig: v1002000.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}

export const multisigExecuted =  {
    name: 'Multisig.MultisigExecuted',
    /**
     * A multisig operation has been executed.
     */
    v1002000: new EventType(
        'Multisig.MultisigExecuted',
        sts.struct({
            approving: v1002000.AccountId32,
            timepoint: v1002000.Timepoint,
            multisig: v1002000.AccountId32,
            callHash: sts.bytes(),
            result: sts.result(() => sts.unit(), () => v1002000.DispatchError),
        })
    ),
}

export const multisigCancelled =  {
    name: 'Multisig.MultisigCancelled',
    /**
     * A multisig operation has been cancelled.
     */
    v1002000: new EventType(
        'Multisig.MultisigCancelled',
        sts.struct({
            cancelling: v1002000.AccountId32,
            timepoint: v1002000.Timepoint,
            multisig: v1002000.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}
