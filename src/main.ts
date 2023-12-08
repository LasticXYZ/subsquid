import {TypeormDatabase, Store} from '@subsquid/typeorm-store'

import {processor, ProcessorContext} from './processor'
import {
    Account,
    Transfer,
    HistoryInitialized,
    SaleInitialized,
    SalesStarted,
    Purchased,
    Renewable,
    Renewed,
    Transferred,
    Partitioned,
    Interlaced,
    Assigned,
    Pooled,
    CoreCountRequested,
    CoreCountChanged,
    ReservationMade,
    ReservationCancelled,
    Leased,
    LeaseEnding,
    RevenueClaimBegun,
    RevenueClaimItem,
    RevenueClaimPaid,
    CreditPurchased,
    RegionDropped,
    ContributionDropped,
    HistoryDropped,
    HistoryIgnored,
    ClaimsReady,
    CoreAssigned,
    AllowedRenewalDropped
} from './model'
import { 
    TransferEvent,
    HistoryInitializedEvent, 
    SaleInitializedEvent,
    SalesStartedEvent,
    PurchasedEvent,
    RenewableEvent,
    RenewedEvent,
    TransferredEvent,
    PartitionedEvent,
    InterlacedEvent,
    AssignedEvent,
    PooledEvent,
    CoreCountRequestedEvent,
    CoreCountChangedEvent,
    ReservationMadeEvent,
    ReservationCancelledEvent,
    LeasedEvent,
    LeaseEndingEvent,
    RevenueClaimBegunEvent,
    RevenueClaimItemEvent,
    RevenueClaimPaidEvent,
    CreditPurchasedEvent,
    RegionDroppedEvent,
    ContributionDroppedEvent,
    HistoryDroppedEvent,
    HistoryIgnoredEvent,
    ClaimsReadyEvent,
    CoreAssignedEvent,
    AllowedRenewalDroppedEvent
 } from './interfaces'

import { 
    getTransferEvents,
    getHistoryInitializedEvents,
    getSaleInitializedEvents, 
    getSalesStartedEvents, 
    getPurchasedEvents,
    getRenewableEvents,
    getRenewedEvents,
    getTransferredEvents,
    getPartitionedEvents,
    getInterlacedEvents,
    getAssignedEvents,
    getPooledEvents,
    getCoreCountRequestedEvents,
    getCoreCountChangedEvents,
    getReservationMadeEvents,
    getReservationCancelledEvents,
    getLeasedEvents,
    getLeaseEndingEvents,
    getRevenueClaimBegunEvents,
    getRevenueClaimItemEvents,
    getRevenueClaimPaidEvents,
    getCreditPurchasedEvents,
    getRegionDroppedEvents,
    getContributionDroppedEvents,
    getHistoryDroppedEvents,
    getHistoryIgnoredEvents,
    getClaimsReadyEvents,
    getCoreAssignedEvents,
    getAllowedRenewalDroppedEvents
} from './getEvents'

import { 
    createAccounts, 
    createTransfers, 
    createHistoryInitializedEntities, 
    createSaleInitializedEntities, 
    createSalesStartedEntities,
    createPurchasedEntities,
    createRenewableEntities,
    createRenewedEntities,
    createTransferredEntities,
    createPartitionedEntities,
    createInterlacedEntities,
    createAssignedEntities,
    createPooledEntities,
    createCoreCountRequestedEntities,
    createCoreCountChangedEntities,
    createReservationMadeEntities,
    createReservationCancelledEntities,
    createLeasedEntities,
    createLeaseEndingEntities,
    createRevenueClaimBegunEntities,
    createRevenueClaimItemEntities,
    createRevenueClaimPaidEntities,
    createCreditPurchasedEntities,
    createRegionDroppedEntities,
    createContributionDroppedEntities,
    createHistoryDroppedEntities,
    createHistoryIgnoredEntities,
    createClaimsReadyEntities,
    createCoreAssignedEntities,
    createAllowedRenewalDroppedEntities
 } from './createEntities'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    let transferEvents: TransferEvent[] = getTransferEvents(ctx)

    let historyInitializedEvents: HistoryInitializedEvent[] = getHistoryInitializedEvents(ctx)
    let saleInitializedEvents: SaleInitializedEvent[] = getSaleInitializedEvents(ctx)
    let salesStartedEvents: SalesStartedEvent[] = getSalesStartedEvents(ctx)
    let purchasedEvents: PurchasedEvent[] = getPurchasedEvents(ctx)
    let renewableEvents: RenewableEvent[] = getRenewableEvents(ctx)
    let renewedEvents: RenewedEvent[] = getRenewedEvents(ctx)
    let transferredEvents: TransferredEvent[] = getTransferredEvents(ctx)
    let partitionedEvents: PartitionedEvent[] = getPartitionedEvents(ctx)
    let interlacedEvents: InterlacedEvent[] = getInterlacedEvents(ctx)
    let assignedEvents: AssignedEvent[] = getAssignedEvents(ctx)
    let pooledEvents: PooledEvent[] = getPooledEvents(ctx)
    let coreCountRequestedEvents: CoreCountRequestedEvent[] = getCoreCountRequestedEvents(ctx)
    let coreCountChangedEvents: CoreCountChangedEvent[] = getCoreCountChangedEvents(ctx)
    let reservationMadeEvents: ReservationMadeEvent[] = getReservationMadeEvents(ctx)
    let reservationCancelledEvents: ReservationCancelledEvent[] = getReservationCancelledEvents(ctx)
    let leasedEvents: LeasedEvent[] = getLeasedEvents(ctx)
    let leaseEndingEvents: LeaseEndingEvent[] = getLeaseEndingEvents(ctx)
    let revenueClaimBegunEvents: RevenueClaimBegunEvent[] = getRevenueClaimBegunEvents(ctx)
    let revenueClaimItemEvents: RevenueClaimItemEvent[] = getRevenueClaimItemEvents(ctx)
    let revenueClaimPaidEvents: RevenueClaimPaidEvent[] = getRevenueClaimPaidEvents(ctx)
    let creditPurchasedEvents: CreditPurchasedEvent[] = getCreditPurchasedEvents(ctx)
    let regionDroppedEvents: RegionDroppedEvent[] = getRegionDroppedEvents(ctx)
    let contributionDroppedEvents: ContributionDroppedEvent[] = getContributionDroppedEvents(ctx)
    let historyDroppedEvents: HistoryDroppedEvent[] = getHistoryDroppedEvents(ctx)
    let historyIgnoredEvents: HistoryIgnoredEvent[] = getHistoryIgnoredEvents(ctx)
    let claimsReadyEvents: ClaimsReadyEvent[] = getClaimsReadyEvents(ctx)
    let coreAssignedEvents: CoreAssignedEvent[] = getCoreAssignedEvents(ctx)
    let allowedRenewalDroppedEvents: AllowedRenewalDroppedEvent[] = getAllowedRenewalDroppedEvents(ctx)

    let accounts: Map<string, Account> = await createAccounts(ctx, transferEvents)
    let transfers: Transfer[] = createTransfers(transferEvents, accounts)

    // Create entities for broker events
    let historyInitializedEntities: HistoryInitialized[] = createHistoryInitializedEntities(historyInitializedEvents)
    let saleInitializedEntities: SaleInitialized[] = createSaleInitializedEntities(saleInitializedEvents)
    let salesStartedEntities: SalesStarted[] = createSalesStartedEntities(salesStartedEvents)
    let purchasedEntities: Purchased[] = createPurchasedEntities(purchasedEvents)
    let renewableEntities: Renewable[] = createRenewableEntities(renewableEvents)
    let renewedEntities: Renewed[] = createRenewedEntities(renewedEvents)
    let transferredEntities: Transferred[] = createTransferredEntities(transferredEvents)
    let partitionedEntities: Partitioned[] = createPartitionedEntities(partitionedEvents)
    let interlacedEntities: Interlaced[] = createInterlacedEntities(interlacedEvents)
    let assignedEntities: Assigned[] = createAssignedEntities(assignedEvents)
    let pooledEntities: Pooled[] = createPooledEntities(pooledEvents)
    let coreCountRequestedEntities: CoreCountRequested[] = createCoreCountRequestedEntities(coreCountRequestedEvents)
    let coreCountChangedEntities: CoreCountChanged[] = createCoreCountChangedEntities(coreCountChangedEvents)
    let reservationMadeEntities: ReservationMade[] = createReservationMadeEntities(reservationMadeEvents)
    let reservationCancelledEntities: ReservationCancelled[] = createReservationCancelledEntities(reservationCancelledEvents)
    let leasedEntities: Leased[] = createLeasedEntities(leasedEvents)
    let leaseEndingEntities: LeaseEnding[] = createLeaseEndingEntities(leaseEndingEvents)
    let revenueClaimBegunEntities: RevenueClaimBegun[] = createRevenueClaimBegunEntities(revenueClaimBegunEvents)
    let revenueClaimItemEntities: RevenueClaimItem[] = createRevenueClaimItemEntities(revenueClaimItemEvents)
    let revenueClaimPaidEntities: RevenueClaimPaid[] = createRevenueClaimPaidEntities(revenueClaimPaidEvents)
    let creditPurchasedEntities: CreditPurchased[] = createCreditPurchasedEntities(creditPurchasedEvents)
    let regionDroppedEntities: RegionDropped[] = createRegionDroppedEntities(regionDroppedEvents)
    let contributionDroppedEntities: ContributionDropped[] = createContributionDroppedEntities(contributionDroppedEvents)
    let historyDroppedEntities: HistoryDropped[] = createHistoryDroppedEntities(historyDroppedEvents)
    let historyIgnoredEntities: HistoryIgnored[] = createHistoryIgnoredEntities(historyIgnoredEvents)
    let claimsReadyEntities: ClaimsReady[] = createClaimsReadyEntities(claimsReadyEvents)
    let coreAssignedEntities: CoreAssigned[] = createCoreAssignedEntities(coreAssignedEvents)
    let allowedRenewalDroppedEntities: AllowedRenewalDropped[] = createAllowedRenewalDroppedEntities(allowedRenewalDroppedEvents)

    await ctx.store.upsert([...accounts.values()])
    await ctx.store.insert(transfers)
    await ctx.store.insert(historyInitializedEntities)
    await ctx.store.insert(saleInitializedEntities)
    await ctx.store.insert(salesStartedEntities)
    await ctx.store.insert(purchasedEntities)
    await ctx.store.insert(renewableEntities)
    await ctx.store.insert(renewedEntities)
    await ctx.store.insert(transferredEntities)
    await ctx.store.insert(partitionedEntities)
    await ctx.store.insert(interlacedEntities)
    await ctx.store.insert(assignedEntities)
    await ctx.store.insert(pooledEntities)
    await ctx.store.insert(coreCountRequestedEntities)
    await ctx.store.insert(coreCountChangedEntities)
    await ctx.store.insert(reservationMadeEntities)
    await ctx.store.insert(reservationCancelledEntities)
    await ctx.store.insert(leasedEntities)
    await ctx.store.insert(leaseEndingEntities)
    await ctx.store.insert(revenueClaimBegunEntities)
    await ctx.store.insert(revenueClaimItemEntities)
    await ctx.store.insert(revenueClaimPaidEntities)
    await ctx.store.insert(creditPurchasedEntities)
    await ctx.store.insert(regionDroppedEntities)
    await ctx.store.insert(contributionDroppedEntities)
    await ctx.store.insert(historyDroppedEntities)
    await ctx.store.insert(historyIgnoredEntities)
    await ctx.store.insert(claimsReadyEntities)
    await ctx.store.insert(coreAssignedEntities)
    await ctx.store.insert(allowedRenewalDroppedEntities)
})

