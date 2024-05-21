import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v9430 from '../v9430'

export const newMultisig =  {
    name: 'Multisig.NewMultisig',
    /**
     * A new multisig operation has begun.
     */
    v9430: new EventType(
        'Multisig.NewMultisig',
        sts.struct({
            approving: v9430.AccountId32,
            multisig: v9430.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}

export const multisigApproval =  {
    name: 'Multisig.MultisigApproval',
    /**
     * A multisig operation has been approved by someone.
     */
    v9430: new EventType(
        'Multisig.MultisigApproval',
        sts.struct({
            approving: v9430.AccountId32,
            timepoint: v9430.Timepoint,
            multisig: v9430.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}

export const multisigExecuted =  {
    name: 'Multisig.MultisigExecuted',
    /**
     * A multisig operation has been executed.
     */
    v9430: new EventType(
        'Multisig.MultisigExecuted',
        sts.struct({
            approving: v9430.AccountId32,
            timepoint: v9430.Timepoint,
            multisig: v9430.AccountId32,
            callHash: sts.bytes(),
            result: sts.result(() => sts.unit(), () => v9430.DispatchError),
        })
    ),
}

export const multisigCancelled =  {
    name: 'Multisig.MultisigCancelled',
    /**
     * A multisig operation has been cancelled.
     */
    v9430: new EventType(
        'Multisig.MultisigCancelled',
        sts.struct({
            cancelling: v9430.AccountId32,
            timepoint: v9430.Timepoint,
            multisig: v9430.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}
