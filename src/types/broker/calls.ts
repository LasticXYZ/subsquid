import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v1003000 from '../v1003000'

export const configure =  {
    name: 'Broker.configure',
    /**
     * Configure the pallet.
     * 
     * - `origin`: Must be Root or pass `AdminOrigin`.
     * - `config`: The configuration for this pallet.
     */
    v1003000: new CallType(
        'Broker.configure',
        sts.struct({
            config: v1003000.ConfigRecord,
        })
    ),
}

export const reserve =  {
    name: 'Broker.reserve',
    /**
     * Reserve a core for a workload.
     * 
     * - `origin`: Must be Root or pass `AdminOrigin`.
     * - `workload`: The workload which should be permanently placed on a core.
     */
    v1003000: new CallType(
        'Broker.reserve',
        sts.struct({
            workload: sts.array(() => v1003000.ScheduleItem),
        })
    ),
}

export const unreserve =  {
    name: 'Broker.unreserve',
    /**
     * Cancel a reservation for a workload.
     * 
     * - `origin`: Must be Root or pass `AdminOrigin`.
     * - `item_index`: The index of the reservation. Usually this will also be the index of the
     *   core on which the reservation has been scheduled. However, it is possible that if
     *   other cores are reserved or unreserved in the same sale rotation that they won't
     *   correspond, so it's better to look up the core properly in the `Reservations` storage.
     */
    v1003000: new CallType(
        'Broker.unreserve',
        sts.struct({
            itemIndex: sts.number(),
        })
    ),
}

export const setLease =  {
    name: 'Broker.set_lease',
    /**
     * Reserve a core for a single task workload for a limited period.
     * 
     * In the interlude and sale period where Bulk Coretime is sold for the period immediately
     * after `until`, then the same workload may be renewed.
     * 
     * - `origin`: Must be Root or pass `AdminOrigin`.
     * - `task`: The workload which should be placed on a core.
     * - `until`: The timeslice now earlier than which `task` should be placed as a workload on
     *   a core.
     */
    v1003000: new CallType(
        'Broker.set_lease',
        sts.struct({
            task: sts.number(),
            until: sts.number(),
        })
    ),
}

export const startSales =  {
    name: 'Broker.start_sales',
    /**
     * Begin the Bulk Coretime sales rotation.
     * 
     * - `origin`: Must be Root or pass `AdminOrigin`.
     * - `end_price`: The price after the leadin period of Bulk Coretime in the first sale.
     * - `extra_cores`: Number of extra cores that should be requested on top of the cores
     *   required for `Reservations` and `Leases`.
     * 
     * This will call [`Self::request_core_count`] internally to set the correct core count on
     * the relay chain.
     */
    v1003000: new CallType(
        'Broker.start_sales',
        sts.struct({
            endPrice: sts.bigint(),
            extraCores: sts.number(),
        })
    ),
}

export const purchase =  {
    name: 'Broker.purchase',
    /**
     * Purchase Bulk Coretime in the ongoing Sale.
     * 
     * - `origin`: Must be a Signed origin with at least enough funds to pay the current price
     *   of Bulk Coretime.
     * - `price_limit`: An amount no more than which should be paid.
     */
    v1003000: new CallType(
        'Broker.purchase',
        sts.struct({
            priceLimit: sts.bigint(),
        })
    ),
}

export const renew =  {
    name: 'Broker.renew',
    /**
     * Renew Bulk Coretime in the ongoing Sale or its prior Interlude Period.
     * 
     * - `origin`: Must be a Signed origin with at least enough funds to pay the renewal price
     *   of the core.
     * - `core`: The core which should be renewed.
     */
    v1003000: new CallType(
        'Broker.renew',
        sts.struct({
            core: sts.number(),
        })
    ),
}

export const transfer =  {
    name: 'Broker.transfer',
    /**
     * Transfer a Bulk Coretime Region to a new owner.
     * 
     * - `origin`: Must be a Signed origin of the account which owns the Region `region_id`.
     * - `region_id`: The Region whose ownership should change.
     * - `new_owner`: The new owner for the Region.
     */
    v1003000: new CallType(
        'Broker.transfer',
        sts.struct({
            regionId: v1003000.RegionId,
            newOwner: v1003000.AccountId32,
        })
    ),
}

export const partition =  {
    name: 'Broker.partition',
    /**
     * Split a Bulk Coretime Region into two non-overlapping Regions at a particular time into
     * the region.
     * 
     * - `origin`: Must be a Signed origin of the account which owns the Region `region_id`.
     * - `region_id`: The Region which should be partitioned into two non-overlapping Regions.
     * - `pivot`: The offset in time into the Region at which to make the split.
     */
    v1003000: new CallType(
        'Broker.partition',
        sts.struct({
            regionId: v1003000.RegionId,
            pivot: sts.number(),
        })
    ),
}

export const interlace =  {
    name: 'Broker.interlace',
    /**
     * Split a Bulk Coretime Region into two wholly-overlapping Regions with complementary
     * interlace masks which together make up the original Region's interlace mask.
     * 
     * - `origin`: Must be a Signed origin of the account which owns the Region `region_id`.
     * - `region_id`: The Region which should become two interlaced Regions of incomplete
     *   regularity.
     * - `pivot`: The interlace mask of one of the two new regions (the other is its partial
     *   complement).
     */
    v1003000: new CallType(
        'Broker.interlace',
        sts.struct({
            regionId: v1003000.RegionId,
            pivot: v1003000.CoreMask,
        })
    ),
}

export const assign =  {
    name: 'Broker.assign',
    /**
     * Assign a Bulk Coretime Region to a task.
     * 
     * - `origin`: Must be a Signed origin of the account which owns the Region `region_id`.
     * - `region_id`: The Region which should be assigned to the task.
     * - `task`: The task to assign.
     * - `finality`: Indication of whether this assignment is final (in which case it may be
     *   eligible for renewal) or provisional (in which case it may be manipulated and/or
     * reassigned at a later stage).
     */
    v1003000: new CallType(
        'Broker.assign',
        sts.struct({
            regionId: v1003000.RegionId,
            task: sts.number(),
            finality: v1003000.Finality,
        })
    ),
}

export const pool =  {
    name: 'Broker.pool',
    /**
     * Place a Bulk Coretime Region into the Instantaneous Coretime Pool.
     * 
     * - `origin`: Must be a Signed origin of the account which owns the Region `region_id`.
     * - `region_id`: The Region which should be assigned to the Pool.
     * - `payee`: The account which is able to collect any revenue due for the usage of this
     *   Coretime.
     */
    v1003000: new CallType(
        'Broker.pool',
        sts.struct({
            regionId: v1003000.RegionId,
            payee: v1003000.AccountId32,
            finality: v1003000.Finality,
        })
    ),
}

export const claimRevenue =  {
    name: 'Broker.claim_revenue',
    /**
     * Claim the revenue owed from inclusion in the Instantaneous Coretime Pool.
     * 
     * - `origin`: Must be a Signed origin.
     * - `region_id`: The Region which was assigned to the Pool.
     * - `max_timeslices`: The maximum number of timeslices which should be processed. This
     *   must be greater than 0. This may affect the weight of the call but should be ideally
     *   made equivalent to the length of the Region `region_id`. If less, further dispatches
     *   will be required with the same `region_id` to claim revenue for the remainder.
     */
    v1003000: new CallType(
        'Broker.claim_revenue',
        sts.struct({
            regionId: v1003000.RegionId,
            maxTimeslices: sts.number(),
        })
    ),
}

export const purchaseCredit =  {
    name: 'Broker.purchase_credit',
    /**
     * Purchase credit for use in the Instantaneous Coretime Pool.
     * 
     * - `origin`: Must be a Signed origin able to pay at least `amount`.
     * - `amount`: The amount of credit to purchase.
     * - `beneficiary`: The account on the Relay-chain which controls the credit (generally
     *   this will be the collator's hot wallet).
     */
    v1003000: new CallType(
        'Broker.purchase_credit',
        sts.struct({
            amount: sts.bigint(),
            beneficiary: v1003000.AccountId32,
        })
    ),
}

export const dropRegion =  {
    name: 'Broker.drop_region',
    /**
     * Drop an expired Region from the chain.
     * 
     * - `origin`: Can be any kind of origin.
     * - `region_id`: The Region which has expired.
     */
    v1003000: new CallType(
        'Broker.drop_region',
        sts.struct({
            regionId: v1003000.RegionId,
        })
    ),
}

export const dropContribution =  {
    name: 'Broker.drop_contribution',
    /**
     * Drop an expired Instantaneous Pool Contribution record from the chain.
     * 
     * - `origin`: Can be any kind of origin.
     * - `region_id`: The Region identifying the Pool Contribution which has expired.
     */
    v1003000: new CallType(
        'Broker.drop_contribution',
        sts.struct({
            regionId: v1003000.RegionId,
        })
    ),
}

export const dropHistory =  {
    name: 'Broker.drop_history',
    /**
     * Drop an expired Instantaneous Pool History record from the chain.
     * 
     * - `origin`: Can be any kind of origin.
     * - `region_id`: The time of the Pool History record which has expired.
     */
    v1003000: new CallType(
        'Broker.drop_history',
        sts.struct({
            when: sts.number(),
        })
    ),
}

export const dropRenewal =  {
    name: 'Broker.drop_renewal',
    /**
     * Drop an expired Allowed Renewal record from the chain.
     * 
     * - `origin`: Can be any kind of origin.
     * - `core`: The core to which the expired renewal refers.
     * - `when`: The timeslice to which the expired renewal refers. This must have passed.
     */
    v1003000: new CallType(
        'Broker.drop_renewal',
        sts.struct({
            core: sts.number(),
            when: sts.number(),
        })
    ),
}

export const requestCoreCount =  {
    name: 'Broker.request_core_count',
    /**
     * Request a change to the number of cores available for scheduling work.
     * 
     * - `origin`: Must be Root or pass `AdminOrigin`.
     * - `core_count`: The desired number of cores to be made available.
     */
    v1003000: new CallType(
        'Broker.request_core_count',
        sts.struct({
            coreCount: sts.number(),
        })
    ),
}

export const notifyCoreCount =  {
    name: 'Broker.notify_core_count',
    v1003000: new CallType(
        'Broker.notify_core_count',
        sts.struct({
            coreCount: sts.number(),
        })
    ),
}

export const notifyRevenue =  {
    name: 'Broker.notify_revenue',
    v1003000: new CallType(
        'Broker.notify_revenue',
        sts.struct({
            revenue: v1003000.OnDemandRevenueRecord,
        })
    ),
}

export const swapLeases =  {
    name: 'Broker.swap_leases',
    v1003000: new CallType(
        'Broker.swap_leases',
        sts.struct({
            id: sts.number(),
            other: sts.number(),
        })
    ),
}
