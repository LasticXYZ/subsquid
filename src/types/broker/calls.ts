import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as coretimeRococoV9430 from '../coretimeRococoV9430'

export const configure =  {
    name: 'Broker.configure',
    /**
     * See [`Pallet::configure`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.configure',
        sts.struct({
            config: coretimeRococoV9430.ConfigRecord,
        })
    ),
}

export const reserve =  {
    name: 'Broker.reserve',
    /**
     * See [`Pallet::reserve`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.reserve',
        sts.struct({
            workload: sts.array(() => coretimeRococoV9430.ScheduleItem),
        })
    ),
}

export const unreserve =  {
    name: 'Broker.unreserve',
    /**
     * See [`Pallet::unreserve`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.unreserve',
        sts.struct({
            itemIndex: sts.number(),
        })
    ),
}

export const setLease =  {
    name: 'Broker.set_lease',
    /**
     * See [`Pallet::set_lease`].
     */
    coretimeRococoV9430: new CallType(
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
     * See [`Pallet::start_sales`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.start_sales',
        sts.struct({
            initialPrice: sts.bigint(),
            coreCount: sts.number(),
        })
    ),
}

export const purchase =  {
    name: 'Broker.purchase',
    /**
     * See [`Pallet::purchase`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.purchase',
        sts.struct({
            priceLimit: sts.bigint(),
        })
    ),
}

export const renew =  {
    name: 'Broker.renew',
    /**
     * See [`Pallet::renew`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.renew',
        sts.struct({
            core: sts.number(),
        })
    ),
}

export const transfer =  {
    name: 'Broker.transfer',
    /**
     * See [`Pallet::transfer`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.transfer',
        sts.struct({
            regionId: coretimeRococoV9430.RegionId,
            newOwner: coretimeRococoV9430.AccountId32,
        })
    ),
}

export const partition =  {
    name: 'Broker.partition',
    /**
     * See [`Pallet::partition`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.partition',
        sts.struct({
            regionId: coretimeRococoV9430.RegionId,
            pivot: sts.number(),
        })
    ),
}

export const interlace =  {
    name: 'Broker.interlace',
    /**
     * See [`Pallet::interlace`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.interlace',
        sts.struct({
            regionId: coretimeRococoV9430.RegionId,
            pivot: coretimeRococoV9430.CoreMask,
        })
    ),
}

export const assign =  {
    name: 'Broker.assign',
    /**
     * See [`Pallet::assign`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.assign',
        sts.struct({
            regionId: coretimeRococoV9430.RegionId,
            task: sts.number(),
            finality: coretimeRococoV9430.Finality,
        })
    ),
}

export const pool =  {
    name: 'Broker.pool',
    /**
     * See [`Pallet::pool`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.pool',
        sts.struct({
            regionId: coretimeRococoV9430.RegionId,
            payee: coretimeRococoV9430.AccountId32,
            finality: coretimeRococoV9430.Finality,
        })
    ),
}

export const claimRevenue =  {
    name: 'Broker.claim_revenue',
    /**
     * See [`Pallet::claim_revenue`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.claim_revenue',
        sts.struct({
            regionId: coretimeRococoV9430.RegionId,
            maxTimeslices: sts.number(),
        })
    ),
}

export const purchaseCredit =  {
    name: 'Broker.purchase_credit',
    /**
     * See [`Pallet::purchase_credit`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.purchase_credit',
        sts.struct({
            amount: sts.bigint(),
            beneficiary: coretimeRococoV9430.AccountId32,
        })
    ),
}

export const dropRegion =  {
    name: 'Broker.drop_region',
    /**
     * See [`Pallet::drop_region`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.drop_region',
        sts.struct({
            regionId: coretimeRococoV9430.RegionId,
        })
    ),
}

export const dropContribution =  {
    name: 'Broker.drop_contribution',
    /**
     * See [`Pallet::drop_contribution`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.drop_contribution',
        sts.struct({
            regionId: coretimeRococoV9430.RegionId,
        })
    ),
}

export const dropHistory =  {
    name: 'Broker.drop_history',
    /**
     * See [`Pallet::drop_history`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.drop_history',
        sts.struct({
            when: sts.number(),
        })
    ),
}

export const dropRenewal =  {
    name: 'Broker.drop_renewal',
    /**
     * See [`Pallet::drop_renewal`].
     */
    coretimeRococoV9430: new CallType(
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
     * See [`Pallet::request_core_count`].
     */
    coretimeRococoV9430: new CallType(
        'Broker.request_core_count',
        sts.struct({
            coreCount: sts.number(),
        })
    ),
}

export const notifyCoreCount =  {
    name: 'Broker.notify_core_count',
    /**
     * See [`Pallet::notify_core_count`].
     */
    coretimeRococoV1005001: new CallType(
        'Broker.notify_core_count',
        sts.struct({
            coreCount: sts.number(),
        })
    ),
}

export const swapLeases =  {
    name: 'Broker.swap_leases',
    coretimeRococoV1010000: new CallType(
        'Broker.swap_leases',
        sts.struct({
            id: sts.number(),
            other: sts.number(),
        })
    ),
}
