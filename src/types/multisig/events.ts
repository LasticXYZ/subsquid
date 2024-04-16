import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as coretimeRococoV9430 from '../coretimeRococoV9430'

export const newMultisig =  {
    name: 'Multisig.NewMultisig',
    /**
     * A new multisig operation has begun.
     */
    coretimeRococoV9430: new EventType(
        'Multisig.NewMultisig',
        sts.struct({
            approving: coretimeRococoV9430.AccountId32,
            multisig: coretimeRococoV9430.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}

export const multisigApproval =  {
    name: 'Multisig.MultisigApproval',
    /**
     * A multisig operation has been approved by someone.
     */
    coretimeRococoV9430: new EventType(
        'Multisig.MultisigApproval',
        sts.struct({
            approving: coretimeRococoV9430.AccountId32,
            timepoint: coretimeRococoV9430.Timepoint,
            multisig: coretimeRococoV9430.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}

export const multisigExecuted =  {
    name: 'Multisig.MultisigExecuted',
    /**
     * A multisig operation has been executed.
     */
    coretimeRococoV9430: new EventType(
        'Multisig.MultisigExecuted',
        sts.struct({
            approving: coretimeRococoV9430.AccountId32,
            timepoint: coretimeRococoV9430.Timepoint,
            multisig: coretimeRococoV9430.AccountId32,
            callHash: sts.bytes(),
            result: sts.result(() => sts.unit(), () => coretimeRococoV9430.DispatchError),
        })
    ),
}

export const multisigCancelled =  {
    name: 'Multisig.MultisigCancelled',
    /**
     * A multisig operation has been cancelled.
     */
    coretimeRococoV9430: new EventType(
        'Multisig.MultisigCancelled',
        sts.struct({
            cancelling: coretimeRococoV9430.AccountId32,
            timepoint: coretimeRococoV9430.Timepoint,
            multisig: coretimeRococoV9430.AccountId32,
            callHash: sts.bytes(),
        })
    ),
}
