import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as coretimeRococoV9430 from '../coretimeRococoV9430'
import * as v1002000 from '../v1002000'
import * as coretimeRococoV1005000 from '../coretimeRococoV1005000'
import * as coretimeRococoV1005001 from '../coretimeRococoV1005001'
import * as coretimeRococoV1007000 from '../coretimeRococoV1007000'
import * as coretimeRococoV1009000 from '../coretimeRococoV1009000'
import * as coretimeRococoV1010000 from '../coretimeRococoV1010000'

export const asMultiThreshold1 =  {
    name: 'Multisig.as_multi_threshold_1',
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    coretimeRococoV9430: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => coretimeRococoV9430.AccountId32),
            call: coretimeRococoV9430.Call,
        })
    ),
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    coretimeRococoV1005000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => coretimeRococoV1005000.AccountId32),
            call: coretimeRococoV1005000.Call,
        })
    ),
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    coretimeRococoV1005001: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => coretimeRococoV1005001.AccountId32),
            call: coretimeRococoV1005001.Call,
        })
    ),
    /**
     * See [`Pallet::as_multi_threshold_1`].
     */
    coretimeRococoV1007000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => coretimeRococoV1007000.AccountId32),
            call: coretimeRococoV1007000.Call,
        })
    ),
    /**
     * Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * - `other_signatories`: The accounts (other than the sender) who are part of the
     * multi-signature, but do not participate in the approval process.
     * - `call`: The call to be executed.
     * 
     * Result is equivalent to the dispatched result.
     * 
     * ## Complexity
     * O(Z + C) where Z is the length of the call and C its execution weight.
     */
    coretimeRococoV1009000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => coretimeRococoV1009000.AccountId32),
            call: coretimeRococoV1009000.Call,
        })
    ),
    /**
     * Immediately dispatch a multi-signature call using a single approval from the caller.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * - `other_signatories`: The accounts (other than the sender) who are part of the
     * multi-signature, but do not participate in the approval process.
     * - `call`: The call to be executed.
     * 
     * Result is equivalent to the dispatched result.
     * 
     * ## Complexity
     * O(Z + C) where Z is the length of the call and C its execution weight.
     */
    coretimeRococoV1010000: new CallType(
        'Multisig.as_multi_threshold_1',
        sts.struct({
            otherSignatories: sts.array(() => coretimeRococoV1010000.AccountId32),
            call: coretimeRococoV1010000.Call,
        })
    ),
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
}

export const asMulti =  {
    name: 'Multisig.as_multi',
    /**
     * See [`Pallet::as_multi`].
     */
    coretimeRococoV9430: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => coretimeRococoV9430.AccountId32),
            maybeTimepoint: sts.option(() => coretimeRococoV9430.Timepoint),
            call: coretimeRococoV9430.Call,
            maxWeight: coretimeRococoV9430.Weight,
        })
    ),
    /**
     * See [`Pallet::as_multi`].
     */
    coretimeRococoV1005000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => coretimeRococoV1005000.AccountId32),
            maybeTimepoint: sts.option(() => coretimeRococoV1005000.Timepoint),
            call: coretimeRococoV1005000.Call,
            maxWeight: coretimeRococoV1005000.Weight,
        })
    ),
    /**
     * See [`Pallet::as_multi`].
     */
    coretimeRococoV1005001: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => coretimeRococoV1005001.AccountId32),
            maybeTimepoint: sts.option(() => coretimeRococoV1005001.Timepoint),
            call: coretimeRococoV1005001.Call,
            maxWeight: coretimeRococoV1005001.Weight,
        })
    ),
    /**
     * See [`Pallet::as_multi`].
     */
    coretimeRococoV1007000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => coretimeRococoV1007000.AccountId32),
            maybeTimepoint: sts.option(() => coretimeRococoV1007000.Timepoint),
            call: coretimeRococoV1007000.Call,
            maxWeight: coretimeRococoV1007000.Weight,
        })
    ),
    /**
     * Register approval for a dispatch to be made from a deterministic composite account if
     * approved by a total of `threshold - 1` of `other_signatories`.
     * 
     * If there are enough, then dispatch the call.
     * 
     * Payment: `DepositBase` will be reserved if this is the first approval, plus
     * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
     * is cancelled.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * - `threshold`: The total number of approvals for this dispatch before it is executed.
     * - `other_signatories`: The accounts (other than the sender) who can approve this
     * dispatch. May not be empty.
     * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     * not the first approval, then it must be `Some`, with the timepoint (block number and
     * transaction index) of the first approval transaction.
     * - `call`: The call to be executed.
     * 
     * NOTE: Unless this is the final approval, you will generally want to use
     * `approve_as_multi` instead, since it only requires a hash of the call.
     * 
     * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
     * on success, result is `Ok` and the result from the interior call, if it was executed,
     * may be found in the deposited `MultisigExecuted` event.
     * 
     * ## Complexity
     * - `O(S + Z + Call)`.
     * - Up to one balance-reserve or unreserve operation.
     * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
     * - One encode & hash, both of complexity `O(S)`.
     * - Up to one binary search and insert (`O(logS + S)`).
     * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     * - One event.
     * - The weight of the `call`.
     * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    coretimeRococoV1009000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => coretimeRococoV1009000.AccountId32),
            maybeTimepoint: sts.option(() => coretimeRococoV1009000.Timepoint),
            call: coretimeRococoV1009000.Call,
            maxWeight: coretimeRococoV1009000.Weight,
        })
    ),
    /**
     * Register approval for a dispatch to be made from a deterministic composite account if
     * approved by a total of `threshold - 1` of `other_signatories`.
     * 
     * If there are enough, then dispatch the call.
     * 
     * Payment: `DepositBase` will be reserved if this is the first approval, plus
     * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
     * is cancelled.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * - `threshold`: The total number of approvals for this dispatch before it is executed.
     * - `other_signatories`: The accounts (other than the sender) who can approve this
     * dispatch. May not be empty.
     * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
     * not the first approval, then it must be `Some`, with the timepoint (block number and
     * transaction index) of the first approval transaction.
     * - `call`: The call to be executed.
     * 
     * NOTE: Unless this is the final approval, you will generally want to use
     * `approve_as_multi` instead, since it only requires a hash of the call.
     * 
     * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
     * on success, result is `Ok` and the result from the interior call, if it was executed,
     * may be found in the deposited `MultisigExecuted` event.
     * 
     * ## Complexity
     * - `O(S + Z + Call)`.
     * - Up to one balance-reserve or unreserve operation.
     * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
     *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
     * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
     * - One encode & hash, both of complexity `O(S)`.
     * - Up to one binary search and insert (`O(logS + S)`).
     * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
     * - One event.
     * - The weight of the `call`.
     * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
     *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
     */
    coretimeRococoV1010000: new CallType(
        'Multisig.as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => coretimeRococoV1010000.AccountId32),
            maybeTimepoint: sts.option(() => coretimeRococoV1010000.Timepoint),
            call: coretimeRococoV1010000.Call,
            maxWeight: coretimeRococoV1010000.Weight,
        })
    ),
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
}

export const approveAsMulti =  {
    name: 'Multisig.approve_as_multi',
    /**
     * See [`Pallet::approve_as_multi`].
     */
    coretimeRococoV9430: new CallType(
        'Multisig.approve_as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => coretimeRococoV9430.AccountId32),
            maybeTimepoint: sts.option(() => coretimeRococoV9430.Timepoint),
            callHash: sts.bytes(),
            maxWeight: coretimeRococoV9430.Weight,
        })
    ),
}

export const cancelAsMulti =  {
    name: 'Multisig.cancel_as_multi',
    /**
     * See [`Pallet::cancel_as_multi`].
     */
    coretimeRococoV9430: new CallType(
        'Multisig.cancel_as_multi',
        sts.struct({
            threshold: sts.number(),
            otherSignatories: sts.array(() => coretimeRococoV9430.AccountId32),
            timepoint: coretimeRococoV9430.Timepoint,
            callHash: sts.bytes(),
        })
    ),
}
