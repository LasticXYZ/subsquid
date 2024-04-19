import {TypeormDatabase} from '@subsquid/typeorm-store'

import {processor} from './processor'
import {
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
    AllowedRenewalDropped,
    ConfigureExt,
    ReserveExt,
    UnreserveExt,
    SetLeaseExt,
    StartSalesExt,
    PurchaseExt,
    RenewExt,
    TransferExt,
    PartitionExt,
    InterlaceExt,
    AssignExt,
    PoolExt,
    ClaimRevenueExt, 
    PurchaseCreditExt,
    DropRegionExt,
    DropContributionExt,
    DropHistoryExt,
    DropRenewalExt,
    RequestCoreCountExt,
    NewMultisig,
    MultisigApproval,
    MultisigExecuted,
    MultisigCancelled,
    AsMultiExt
} from './model'
import {
    ConfigureCall,
    ReserveCall,
    UnreserveCall,
    SetLeaseCall,
    StartSalesCall,
    PurchaseCall,
    RenewCall,
    TransferCall,
    PartitionCall,
    InterlaceCall,
    AssignCall,
    PoolCall,
    ClaimRevenueCall,
    PurchaseCreditCall,
    DropRegionCall,
    DropContributionCall,
    DropHistoryCall,
    DropRenewalCall,
    RequestCoreCountCall,
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
    AllowedRenewalDroppedEvent,
    NewMultisigEvent,
    MultisigApprovalEvent,
    MultisigExecutedEvent,
    MultisigCancelledEvent,
    AsMultiCall
 } from './interfaces'

import { 
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
    getAllowedRenewalDroppedEvents,
    getNewMultisigEvents,
    getMultisigApprovalEvents,
    getMultisigExecutedEvents,
    getMultisigCancelledEvents
} from './getEvents'

import { 
    getConfigureCalls,
    getReserveCalls,
    getUnreserveCalls,
    getSetLeaseCalls,
    getStartSalesCalls,
    getPurchaseCalls,
    getRenewCalls,
    getTransferCalls,
    getPartitionCalls,
    getInterlaceCalls,
    getAssignCalls,
    getPoolCalls,
    getClaimRevenueCalls,
    getPurchaseCreditCalls,
    getDropRegionCalls,
    getDropContributionCalls,
    getDropHistoryCalls,
    getDropRenewalCalls,
    getRequestCoreCountCalls,
    getAsMultiCalls
 } from './getCalls'

import { 
    createConfigureCallEntities,
    createReserveCallEntities,
    createUnreserveCallEntities,
    createSetLeaseCallEntities,
    createStartSalesCallEntities,
    createPurchaseCreditCallEntities,
    createPurchaseCallEntities,
    createRenewCallEntities,
    createTransferCallEntities,
    createPartitionCallEntities,
    createInterlaceCallEntities,
    createAssignCallEntities,
    createPoolCallEntities,
    createClaimRevenueCallEntities,
    createDropRegionCallEntities,
    createDropContributionCallEntities,
    createDropHistoryCallEntities,
    createDropRenewalCallEntities,
    createRequestCoreCountCallEntities,
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
    createAllowedRenewalDroppedEntities,
    createNewMultisigntities,
    createMultisigApprovalEntities,
    createMultisigExecutedEntities,
    createMultisigCancelledEntities,
    createAsMultiCallEntities
 } from './createEntities'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    // Fetch broker events
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

    // Fetch multisig events
    let newMultisigEvents: NewMultisigEvent[] = getNewMultisigEvents(ctx)
    let multisigApprovalEvents: MultisigApprovalEvent[] = getMultisigApprovalEvents(ctx)
    let multisigExecutedEvents: MultisigExecutedEvent[] = getMultisigExecutedEvents(ctx)
    let multisigCancelledEvents: MultisigCancelledEvent[] = getMultisigCancelledEvents(ctx)

    // Fetch broker calls
    let configureCalls: ConfigureCall[] = getConfigureCalls(ctx)
    let reserveCalls: ReserveCall[] = getReserveCalls(ctx)
    let unreserveCalls: UnreserveCall[] = getUnreserveCalls(ctx)
    let setLeaseCalls: SetLeaseCall[] = getSetLeaseCalls(ctx)
    let startSalesCalls: StartSalesCall[] = getStartSalesCalls(ctx)
    let purchaseCalls: PurchaseCall[] = getPurchaseCalls(ctx)
    let renewCalls: RenewCall[] = getRenewCalls(ctx)
    let transferCalls: TransferCall[] = getTransferCalls(ctx)
    let partitionCalls: PartitionCall[] = getPartitionCalls(ctx)
    let interlaceCalls: InterlaceCall[] = getInterlaceCalls(ctx)
    let assignCalls: AssignCall[] = getAssignCalls(ctx)
    let poolCalls: PoolCall[] = getPoolCalls(ctx)
    let claimRevenueCalls: ClaimRevenueCall[] = getClaimRevenueCalls(ctx)
    let purchaseCreditCalls: PurchaseCreditCall[] = getPurchaseCreditCalls(ctx)
    let dropRegionCalls: DropRegionCall[] = getDropRegionCalls(ctx)
    let dropContributionCalls: DropContributionCall[] = getDropContributionCalls(ctx)
    let dropHistoryCalls: DropHistoryCall[] = getDropHistoryCalls(ctx)
    let dropRenewalCalls: DropRenewalCall[] = getDropRenewalCalls(ctx)
    let requestCoreCountCalls: RequestCoreCountCall[] = getRequestCoreCountCalls(ctx)

    // Fetch multisig calls
    let asMultiCalls: AsMultiCall[] = getAsMultiCalls(ctx)

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

    // Create entities for multisig events
    let newMultisigEntities: NewMultisig[] = createNewMultisigntities(newMultisigEvents)
    let multisigApprovalEntities: MultisigApproval[] = createMultisigApprovalEntities(multisigApprovalEvents)
    let multisigExecutedEntities: MultisigExecuted[] = createMultisigExecutedEntities(multisigExecutedEvents)
    let multisigCancelledEntities: MultisigCancelled[] = createMultisigCancelledEntities(multisigCancelledEvents)

    //Create entities for broker calls
    let configureCallEntities: ConfigureExt[] = createConfigureCallEntities(configureCalls)
    let reserveCallEntities: ReserveExt[] = createReserveCallEntities(reserveCalls)
    let unreserveCallEntities: UnreserveExt[] = createUnreserveCallEntities(unreserveCalls)
    let setLeaseCallEntities: SetLeaseExt[] = createSetLeaseCallEntities(setLeaseCalls)
    let startSalesCallEntities: StartSalesExt[] = createStartSalesCallEntities(startSalesCalls)
    let purchaseCreditCallEntities: PurchaseCreditExt[] = createPurchaseCreditCallEntities(purchaseCreditCalls)
    let renewCallEntities: RenewExt[] = createRenewCallEntities(renewCalls)
    let transferCallEntities: TransferExt[] = createTransferCallEntities(transferCalls)
    let partitionCallEntities: PartitionExt[] = createPartitionCallEntities(partitionCalls)
    let interlaceCallEntities: InterlaceExt[] = createInterlaceCallEntities(interlaceCalls)
    let assignCallEntities: AssignExt[] = createAssignCallEntities(assignCalls)
    let poolCallEntities: PoolExt[] = createPoolCallEntities(poolCalls)
    let claimRevenueCallEntities: ClaimRevenueExt[] = createClaimRevenueCallEntities(claimRevenueCalls)
    let dropRegionCallEntities: DropRegionExt[] = createDropRegionCallEntities(dropRegionCalls)
    let dropContributionCallEntities: DropContributionExt[] = createDropContributionCallEntities(dropContributionCalls)
    let dropHistoryCallEntities: DropHistoryExt[] = createDropHistoryCallEntities(dropHistoryCalls)
    let dropRenewalCallEntities: DropRenewalExt[] = createDropRenewalCallEntities(dropRenewalCalls)
    let requestCoreCountCallEntities: RequestCoreCountExt[] = createRequestCoreCountCallEntities(requestCoreCountCalls)
    let purchaseCallEntities: PurchaseExt[] = createPurchaseCallEntities(purchaseCalls)

    //Create entities for multisig calls
    let asMultiEntities: AsMultiExt[] = createAsMultiCallEntities(asMultiCalls)

    // Insert broker events
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

    // Insert multisig events
    await ctx.store.insert(newMultisigEntities)
    await ctx.store.insert(multisigApprovalEntities)
    await ctx.store.insert(multisigExecutedEntities)
    await ctx.store.insert(multisigCancelledEntities)

    // Insert broker calls
    await ctx.store.insert(purchaseCallEntities)
    await ctx.store.insert(configureCallEntities)
    await ctx.store.insert(reserveCallEntities)
    await ctx.store.insert(unreserveCallEntities)
    await ctx.store.insert(setLeaseCallEntities)
    await ctx.store.insert(startSalesCallEntities)
    await ctx.store.insert(purchaseCreditCallEntities)
    await ctx.store.insert(renewCallEntities)
    await ctx.store.insert(transferCallEntities)
    await ctx.store.insert(partitionCallEntities)
    await ctx.store.insert(interlaceCallEntities)
    await ctx.store.insert(assignCallEntities)
    await ctx.store.insert(poolCallEntities)
    await ctx.store.insert(claimRevenueCallEntities)
    await ctx.store.insert(dropRegionCallEntities)
    await ctx.store.insert(dropContributionCallEntities)
    await ctx.store.insert(dropHistoryCallEntities)
    await ctx.store.insert(dropRenewalCallEntities)
    await ctx.store.insert(requestCoreCountCallEntities)

    // Insert multisig calls
    await ctx.store.insert(asMultiEntities)
})

