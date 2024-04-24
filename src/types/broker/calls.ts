import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v1002000 from '../v1002000'

export const configure =  {
    name: 'Broker.configure',
    /**
     * See [`Pallet::configure`].
     */
    v1002000: new CallType(
        'Broker.configure',
        sts.struct({
            config: v1002000.ConfigRecord,
        })
    ),
}

export const reserve =  {
    name: 'Broker.reserve',
    /**
     * See [`Pallet::reserve`].
     */
    v1002000: new CallType(
        'Broker.reserve',
        sts.struct({
            workload: sts.array(() => v1002000.ScheduleItem),
        })
    ),
}

export const unreserve =  {
    name: 'Broker.unreserve',
    /**
     * See [`Pallet::unreserve`].
     */
    v1002000: new CallType(
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
    v1002000: new CallType(
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
    v1002000: new CallType(
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
    v1002000: new CallType(
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
    v1002000: new CallType(
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
    v1002000: new CallType(
        'Broker.transfer',
        sts.struct({
            regionId: v1002000.RegionId,
            newOwner: v1002000.AccountId32,
        })
    ),
}

export const partition =  {
    name: 'Broker.partition',
    /**
     * See [`Pallet::partition`].
     */
    v1002000: new CallType(
        'Broker.partition',
        sts.struct({
            regionId: v1002000.RegionId,
            pivot: sts.number(),
        })
    ),
}

export const interlace =  {
    name: 'Broker.interlace',
    /**
     * See [`Pallet::interlace`].
     */
    v1002000: new CallType(
        'Broker.interlace',
        sts.struct({
            regionId: v1002000.RegionId,
            pivot: v1002000.CoreMask,
        })
    ),
}

export const assign =  {
    name: 'Broker.assign',
    /**
     * See [`Pallet::assign`].
     */
    v1002000: new CallType(
        'Broker.assign',
        sts.struct({
            regionId: v1002000.RegionId,
            task: sts.number(),
            finality: v1002000.Finality,
        })
    ),
}

export const pool =  {
    name: 'Broker.pool',
    /**
     * See [`Pallet::pool`].
     */
    v1002000: new CallType(
        'Broker.pool',
        sts.struct({
            regionId: v1002000.RegionId,
            payee: v1002000.AccountId32,
            finality: v1002000.Finality,
        })
    ),
}

export const claimRevenue =  {
    name: 'Broker.claim_revenue',
    /**
     * See [`Pallet::claim_revenue`].
     */
    v1002000: new CallType(
        'Broker.claim_revenue',
        sts.struct({
            regionId: v1002000.RegionId,
            maxTimeslices: sts.number(),
        })
    ),
}

export const purchaseCredit =  {
    name: 'Broker.purchase_credit',
    /**
     * See [`Pallet::purchase_credit`].
     */
    v1002000: new CallType(
        'Broker.purchase_credit',
        sts.struct({
            amount: sts.bigint(),
            beneficiary: v1002000.AccountId32,
        })
    ),
}

export const dropRegion =  {
    name: 'Broker.drop_region',
    /**
     * See [`Pallet::drop_region`].
     */
    v1002000: new CallType(
        'Broker.drop_region',
        sts.struct({
            regionId: v1002000.RegionId,
        })
    ),
}

export const dropContribution =  {
    name: 'Broker.drop_contribution',
    /**
     * See [`Pallet::drop_contribution`].
     */
    v1002000: new CallType(
        'Broker.drop_contribution',
        sts.struct({
            regionId: v1002000.RegionId,
        })
    ),
}

export const dropHistory =  {
    name: 'Broker.drop_history',
    /**
     * See [`Pallet::drop_history`].
     */
    v1002000: new CallType(
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
    v1002000: new CallType(
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
    v1002000: new CallType(
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
    v1002000: new CallType(
        'Broker.notify_core_count',
        sts.struct({
            coreCount: sts.number(),
        })
    ),
}
