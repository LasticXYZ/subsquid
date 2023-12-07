import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v268 from '../v268'

export const configure =  {
    name: 'Broker.configure',
    /**
     * See [`Pallet::configure`].
     */
    v268: new CallType(
        'Broker.configure',
        sts.struct({
            config: v268.ConfigRecord,
        })
    ),
}

export const reserve =  {
    name: 'Broker.reserve',
    /**
     * See [`Pallet::reserve`].
     */
    v268: new CallType(
        'Broker.reserve',
        sts.struct({
            workload: sts.array(() => v268.ScheduleItem),
        })
    ),
}

export const unreserve =  {
    name: 'Broker.unreserve',
    /**
     * See [`Pallet::unreserve`].
     */
    v268: new CallType(
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
    v268: new CallType(
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
    v268: new CallType(
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
    v268: new CallType(
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
    v268: new CallType(
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
    v268: new CallType(
        'Broker.transfer',
        sts.struct({
            regionId: v268.RegionId,
            newOwner: v268.AccountId32,
        })
    ),
}

export const partition =  {
    name: 'Broker.partition',
    /**
     * See [`Pallet::partition`].
     */
    v268: new CallType(
        'Broker.partition',
        sts.struct({
            regionId: v268.RegionId,
            pivot: sts.number(),
        })
    ),
}

export const interlace =  {
    name: 'Broker.interlace',
    /**
     * See [`Pallet::interlace`].
     */
    v268: new CallType(
        'Broker.interlace',
        sts.struct({
            regionId: v268.RegionId,
            pivot: v268.CoreMask,
        })
    ),
}

export const assign =  {
    name: 'Broker.assign',
    /**
     * See [`Pallet::assign`].
     */
    v268: new CallType(
        'Broker.assign',
        sts.struct({
            regionId: v268.RegionId,
            task: sts.number(),
            finality: v268.Finality,
        })
    ),
}

export const pool =  {
    name: 'Broker.pool',
    /**
     * See [`Pallet::pool`].
     */
    v268: new CallType(
        'Broker.pool',
        sts.struct({
            regionId: v268.RegionId,
            payee: v268.AccountId32,
            finality: v268.Finality,
        })
    ),
}

export const claimRevenue =  {
    name: 'Broker.claim_revenue',
    /**
     * See [`Pallet::claim_revenue`].
     */
    v268: new CallType(
        'Broker.claim_revenue',
        sts.struct({
            regionId: v268.RegionId,
            maxTimeslices: sts.number(),
        })
    ),
}

export const purchaseCredit =  {
    name: 'Broker.purchase_credit',
    /**
     * See [`Pallet::purchase_credit`].
     */
    v268: new CallType(
        'Broker.purchase_credit',
        sts.struct({
            amount: sts.bigint(),
            beneficiary: v268.AccountId32,
        })
    ),
}

export const dropRegion =  {
    name: 'Broker.drop_region',
    /**
     * See [`Pallet::drop_region`].
     */
    v268: new CallType(
        'Broker.drop_region',
        sts.struct({
            regionId: v268.RegionId,
        })
    ),
}

export const dropContribution =  {
    name: 'Broker.drop_contribution',
    /**
     * See [`Pallet::drop_contribution`].
     */
    v268: new CallType(
        'Broker.drop_contribution',
        sts.struct({
            regionId: v268.RegionId,
        })
    ),
}

export const dropHistory =  {
    name: 'Broker.drop_history',
    /**
     * See [`Pallet::drop_history`].
     */
    v268: new CallType(
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
    v268: new CallType(
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
    v268: new CallType(
        'Broker.request_core_count',
        sts.struct({
            coreCount: sts.number(),
        })
    ),
}
