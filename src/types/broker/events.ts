import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1003000 from '../v1003000'

export const purchased =  {
    name: 'Broker.Purchased',
    /**
     * A Region of Bulk Coretime has been purchased.
     */
    v1003000: new EventType(
        'Broker.Purchased',
        sts.struct({
            /**
             * The identity of the purchaser.
             */
            who: v1003000.AccountId32,
            /**
             * The identity of the Region.
             */
            regionId: v1003000.RegionId,
            /**
             * The price paid for this Region.
             */
            price: sts.bigint(),
            /**
             * The duration of the Region.
             */
            duration: sts.number(),
        })
    ),
}

export const renewable =  {
    name: 'Broker.Renewable',
    /**
     * The workload of a core has become renewable.
     */
    v1003000: new EventType(
        'Broker.Renewable',
        sts.struct({
            /**
             * The core whose workload can be renewed.
             */
            core: sts.number(),
            /**
             * The price at which the workload can be renewed.
             */
            price: sts.bigint(),
            /**
             * The time at which the workload would recommence of this renewal. The call to renew
             * cannot happen before the beginning of the interlude prior to the sale for regions
             * which begin at this time.
             */
            begin: sts.number(),
            /**
             * The actual workload which can be renewed.
             */
            workload: sts.array(() => v1003000.ScheduleItem),
        })
    ),
}

export const renewed =  {
    name: 'Broker.Renewed',
    /**
     * A workload has been renewed.
     */
    v1003000: new EventType(
        'Broker.Renewed',
        sts.struct({
            /**
             * The identity of the renewer.
             */
            who: v1003000.AccountId32,
            /**
             * The price paid for this renewal.
             */
            price: sts.bigint(),
            /**
             * The index of the core on which the `workload` was previously scheduled.
             */
            oldCore: sts.number(),
            /**
             * The index of the core on which the renewed `workload` has been scheduled.
             */
            core: sts.number(),
            /**
             * The time at which the `workload` will begin on the `core`.
             */
            begin: sts.number(),
            /**
             * The number of timeslices for which this `workload` is newly scheduled.
             */
            duration: sts.number(),
            /**
             * The workload which was renewed.
             */
            workload: sts.array(() => v1003000.ScheduleItem),
        })
    ),
}

export const transferred =  {
    name: 'Broker.Transferred',
    /**
     * Ownership of a Region has been transferred.
     */
    v1003000: new EventType(
        'Broker.Transferred',
        sts.struct({
            /**
             * The Region which has been transferred.
             */
            regionId: v1003000.RegionId,
            /**
             * The duration of the Region.
             */
            duration: sts.number(),
            /**
             * The old owner of the Region.
             */
            oldOwner: sts.option(() => v1003000.AccountId32),
            /**
             * The new owner of the Region.
             */
            owner: sts.option(() => v1003000.AccountId32),
        })
    ),
}

export const partitioned =  {
    name: 'Broker.Partitioned',
    /**
     * A Region has been split into two non-overlapping Regions.
     */
    v1003000: new EventType(
        'Broker.Partitioned',
        sts.struct({
            /**
             * The Region which was split.
             */
            oldRegionId: v1003000.RegionId,
            /**
             * The new Regions into which it became.
             */
            newRegionIds: sts.tuple(() => [v1003000.RegionId, v1003000.RegionId]),
        })
    ),
}

export const interlaced =  {
    name: 'Broker.Interlaced',
    /**
     * A Region has been converted into two overlapping Regions each of lesser regularity.
     */
    v1003000: new EventType(
        'Broker.Interlaced',
        sts.struct({
            /**
             * The Region which was interlaced.
             */
            oldRegionId: v1003000.RegionId,
            /**
             * The new Regions into which it became.
             */
            newRegionIds: sts.tuple(() => [v1003000.RegionId, v1003000.RegionId]),
        })
    ),
}

export const assigned =  {
    name: 'Broker.Assigned',
    /**
     * A Region has been assigned to a particular task.
     */
    v1003000: new EventType(
        'Broker.Assigned',
        sts.struct({
            /**
             * The Region which was assigned.
             */
            regionId: v1003000.RegionId,
            /**
             * The duration of the assignment.
             */
            duration: sts.number(),
            /**
             * The task to which the Region was assigned.
             */
            task: sts.number(),
        })
    ),
}

export const pooled =  {
    name: 'Broker.Pooled',
    /**
     * A Region has been added to the Instantaneous Coretime Pool.
     */
    v1003000: new EventType(
        'Broker.Pooled',
        sts.struct({
            /**
             * The Region which was added to the Instantaneous Coretime Pool.
             */
            regionId: v1003000.RegionId,
            /**
             * The duration of the Region.
             */
            duration: sts.number(),
        })
    ),
}

export const coreCountRequested =  {
    name: 'Broker.CoreCountRequested',
    /**
     * A new number of cores has been requested.
     */
    v1003000: new EventType(
        'Broker.CoreCountRequested',
        sts.struct({
            /**
             * The number of cores requested.
             */
            coreCount: sts.number(),
        })
    ),
}

export const coreCountChanged =  {
    name: 'Broker.CoreCountChanged',
    /**
     * The number of cores available for scheduling has changed.
     */
    v1003000: new EventType(
        'Broker.CoreCountChanged',
        sts.struct({
            /**
             * The new number of cores available for scheduling.
             */
            coreCount: sts.number(),
        })
    ),
}

export const reservationMade =  {
    name: 'Broker.ReservationMade',
    /**
     * There is a new reservation for a workload.
     */
    v1003000: new EventType(
        'Broker.ReservationMade',
        sts.struct({
            /**
             * The index of the reservation.
             */
            index: sts.number(),
            /**
             * The workload of the reservation.
             */
            workload: sts.array(() => v1003000.ScheduleItem),
        })
    ),
}

export const reservationCancelled =  {
    name: 'Broker.ReservationCancelled',
    /**
     * A reservation for a workload has been cancelled.
     */
    v1003000: new EventType(
        'Broker.ReservationCancelled',
        sts.struct({
            /**
             * The index of the reservation which was cancelled.
             */
            index: sts.number(),
            /**
             * The workload of the now cancelled reservation.
             */
            workload: sts.array(() => v1003000.ScheduleItem),
        })
    ),
}

export const saleInitialized =  {
    name: 'Broker.SaleInitialized',
    /**
     * A new sale has been initialized.
     */
    v1003000: new EventType(
        'Broker.SaleInitialized',
        sts.struct({
            /**
             * The local block number at which the sale will/did start.
             */
            saleStart: sts.number(),
            /**
             * The length in blocks of the Leadin Period (where the price is decreasing).
             */
            leadinLength: sts.number(),
            /**
             * The price of Bulk Coretime at the beginning of the Leadin Period.
             */
            startPrice: sts.bigint(),
            /**
             * The price of Bulk Coretime after the Leadin Period.
             */
            endPrice: sts.bigint(),
            /**
             * The first timeslice of the Regions which are being sold in this sale.
             */
            regionBegin: sts.number(),
            /**
             * The timeslice on which the Regions which are being sold in the sale terminate.
             * (i.e. One after the last timeslice which the Regions control.)
             */
            regionEnd: sts.number(),
            /**
             * The number of cores we want to sell, ideally.
             */
            idealCoresSold: sts.number(),
            /**
             * Number of cores which are/have been offered for sale.
             */
            coresOffered: sts.number(),
        })
    ),
}

export const leased =  {
    name: 'Broker.Leased',
    /**
     * A new lease has been created.
     */
    v1003000: new EventType(
        'Broker.Leased',
        sts.struct({
            /**
             * The task to which a core will be assigned.
             */
            task: sts.number(),
            /**
             * The timeslice contained in the sale period after which this lease will
             * self-terminate (and therefore the earliest timeslice at which the lease may no
             * longer apply).
             */
            until: sts.number(),
        })
    ),
}

export const leaseEnding =  {
    name: 'Broker.LeaseEnding',
    /**
     * A lease is about to end.
     */
    v1003000: new EventType(
        'Broker.LeaseEnding',
        sts.struct({
            /**
             * The task to which a core was assigned.
             */
            task: sts.number(),
            /**
             * The timeslice at which the task will no longer be scheduled.
             */
            when: sts.number(),
        })
    ),
}

export const salesStarted =  {
    name: 'Broker.SalesStarted',
    /**
     * The sale rotation has been started and a new sale is imminent.
     */
    v1003000: new EventType(
        'Broker.SalesStarted',
        sts.struct({
            /**
             * The nominal price of an Region of Bulk Coretime.
             */
            price: sts.bigint(),
            /**
             * The maximum number of cores which this pallet will attempt to assign.
             */
            coreCount: sts.number(),
        })
    ),
}

export const revenueClaimBegun =  {
    name: 'Broker.RevenueClaimBegun',
    /**
     * The act of claiming revenue has begun.
     */
    v1003000: new EventType(
        'Broker.RevenueClaimBegun',
        sts.struct({
            /**
             * The region to be claimed for.
             */
            region: v1003000.RegionId,
            /**
             * The maximum number of timeslices which should be searched for claimed.
             */
            maxTimeslices: sts.number(),
        })
    ),
}

export const revenueClaimItem =  {
    name: 'Broker.RevenueClaimItem',
    /**
     * A particular timeslice has a non-zero claim.
     */
    v1003000: new EventType(
        'Broker.RevenueClaimItem',
        sts.struct({
            /**
             * The timeslice whose claim is being processed.
             */
            when: sts.number(),
            /**
             * The amount which was claimed at this timeslice.
             */
            amount: sts.bigint(),
        })
    ),
}

export const revenueClaimPaid =  {
    name: 'Broker.RevenueClaimPaid',
    /**
     * A revenue claim has (possibly only in part) been paid.
     */
    v1003000: new EventType(
        'Broker.RevenueClaimPaid',
        sts.struct({
            /**
             * The account to whom revenue has been paid.
             */
            who: v1003000.AccountId32,
            /**
             * The total amount of revenue claimed and paid.
             */
            amount: sts.bigint(),
            /**
             * The next region which should be claimed for the continuation of this contribution.
             */
            next: sts.option(() => v1003000.RegionId),
        })
    ),
}

export const creditPurchased =  {
    name: 'Broker.CreditPurchased',
    /**
     * Some Instantaneous Coretime Pool credit has been purchased.
     */
    v1003000: new EventType(
        'Broker.CreditPurchased',
        sts.struct({
            /**
             * The account which purchased the credit.
             */
            who: v1003000.AccountId32,
            /**
             * The Relay-chain account to which the credit will be made.
             */
            beneficiary: v1003000.AccountId32,
            /**
             * The amount of credit purchased.
             */
            amount: sts.bigint(),
        })
    ),
}

export const regionDropped =  {
    name: 'Broker.RegionDropped',
    /**
     * A Region has been dropped due to being out of date.
     */
    v1003000: new EventType(
        'Broker.RegionDropped',
        sts.struct({
            /**
             * The Region which no longer exists.
             */
            regionId: v1003000.RegionId,
            /**
             * The duration of the Region.
             */
            duration: sts.number(),
        })
    ),
}

export const contributionDropped =  {
    name: 'Broker.ContributionDropped',
    /**
     * Some historical Instantaneous Core Pool contribution record has been dropped.
     */
    v1003000: new EventType(
        'Broker.ContributionDropped',
        sts.struct({
            /**
             * The Region whose contribution is no longer exists.
             */
            regionId: v1003000.RegionId,
        })
    ),
}

export const historyInitialized =  {
    name: 'Broker.HistoryInitialized',
    /**
     * Some historical Instantaneous Core Pool payment record has been initialized.
     */
    v1003000: new EventType(
        'Broker.HistoryInitialized',
        sts.struct({
            /**
             * The timeslice whose history has been initialized.
             */
            when: sts.number(),
            /**
             * The amount of privately contributed Coretime to the Instantaneous Coretime Pool.
             */
            privatePoolSize: sts.number(),
            /**
             * The amount of Coretime contributed to the Instantaneous Coretime Pool by the
             * Polkadot System.
             */
            systemPoolSize: sts.number(),
        })
    ),
}

export const historyDropped =  {
    name: 'Broker.HistoryDropped',
    /**
     * Some historical Instantaneous Core Pool payment record has been dropped.
     */
    v1003000: new EventType(
        'Broker.HistoryDropped',
        sts.struct({
            /**
             * The timeslice whose history is no longer available.
             */
            when: sts.number(),
            /**
             * The amount of revenue the system has taken.
             */
            revenue: sts.bigint(),
        })
    ),
}

export const historyIgnored =  {
    name: 'Broker.HistoryIgnored',
    /**
     * Some historical Instantaneous Core Pool payment record has been ignored because the
     * timeslice was already known. Governance may need to intervene.
     */
    v1003000: new EventType(
        'Broker.HistoryIgnored',
        sts.struct({
            /**
             * The timeslice whose history is was ignored.
             */
            when: sts.number(),
            /**
             * The amount of revenue which was ignored.
             */
            revenue: sts.bigint(),
        })
    ),
}

export const claimsReady =  {
    name: 'Broker.ClaimsReady',
    /**
     * Some historical Instantaneous Core Pool Revenue is ready for payout claims.
     */
    v1003000: new EventType(
        'Broker.ClaimsReady',
        sts.struct({
            /**
             * The timeslice whose history is available.
             */
            when: sts.number(),
            /**
             * The amount of revenue the Polkadot System has already taken.
             */
            systemPayout: sts.bigint(),
            /**
             * The total amount of revenue remaining to be claimed.
             */
            privatePayout: sts.bigint(),
        })
    ),
}

export const coreAssigned =  {
    name: 'Broker.CoreAssigned',
    /**
     * A Core has been assigned to one or more tasks and/or the Pool on the Relay-chain.
     */
    v1003000: new EventType(
        'Broker.CoreAssigned',
        sts.struct({
            /**
             * The index of the Core which has been assigned.
             */
            core: sts.number(),
            /**
             * The Relay-chain block at which this assignment should take effect.
             */
            when: sts.number(),
            /**
             * The workload to be done on the Core.
             */
            assignment: sts.array(() => sts.tuple(() => [v1003000.CoreAssignment, sts.number()])),
        })
    ),
}

export const potentialRenewalDropped =  {
    name: 'Broker.PotentialRenewalDropped',
    /**
     * Some historical Instantaneous Core Pool payment record has been dropped.
     */
    v1003000: new EventType(
        'Broker.PotentialRenewalDropped',
        sts.struct({
            /**
             * The timeslice whose renewal is no longer available.
             */
            when: sts.number(),
            /**
             * The core whose workload is no longer available to be renewed for `when`.
             */
            core: sts.number(),
        })
    ),
}
