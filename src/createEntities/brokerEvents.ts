
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
} from '../model'
import {In} from 'typeorm'
import {
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

} from '../interfaces'

import {
    convertRegionId, 
    convertRegionIds, 
    transformScheduleItem, 
    transformCoreAssignments
} from './helper'

function createHistoryInitializedEntities(events: HistoryInitializedEvent[]): HistoryInitialized[] {
    return events.map(event => new HistoryInitialized({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        extrinsicHash: event.extrinsicHash,
        when: event.when,
        privatePoolSize: BigInt(event.privatePoolSize),
        systemPoolSize: BigInt(event.systemPoolSize)
    }));
}

function createSaleInitializedEntities(events: SaleInitializedEvent[]): SaleInitialized[] {
    return events.map(event => new SaleInitialized({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        extrinsicHash: event.extrinsicHash,
        saleStart: event.saleStart,
        leadinLength: event.leadinLength,
        startPrice: event.startPrice,
        regularPrice: event.regularPrice,
        regionBegin: event.regionBegin,
        regionEnd: event.regionEnd,
        idealCoresSold: event.idealCoresSold,
        coresOffered: event.coresOffered
    }));
}

function createSalesStartedEntities(events: SalesStartedEvent[]): SalesStarted[] {
    return events.map(event => new SalesStarted({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        extrinsicHash: event.extrinsicHash,
        price: event.price,
        coreCount: event.coreCount
    }));
}

function createPurchasedEntities(events: PurchasedEvent[]): Purchased[] {
    return events.map(event => new Purchased({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        regionId: convertRegionId(event.regionId),
        price: event.price,
        duration: event.duration
    }));
}


function createRenewableEntities(events: RenewableEvent[]): Renewable[] {
    return events.map(event => new Renewable({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        core: event.core,
        price: event.price,
        begin: event.begin,
        workload: event.workload.map(item => transformScheduleItem(item)) // Transform each ScheduleItem
    }));
}

function createRenewedEntities(events: RenewedEvent[]): Renewed[] {
    return events.map(event => new Renewed({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        price: event.price,
        oldCore: event.oldCore,
        core: event.core,
        begin: event.begin,
        duration: event.duration,
        workload: event.workload.map(item => transformScheduleItem(item)) // Transform each ScheduleItem
    }));
}

function createTransferredEntities(events: TransferredEvent[]): Transferred[] {
    return events.map(event => new Transferred({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        regionId: convertRegionId(event.regionId),
        duration: event.duration,
        oldOwner: event.oldOwner,
        owner: event.owner
    }));
}

function createPartitionedEntities(events: PartitionedEvent[]): Partitioned[] {
    return events.map(event => new Partitioned({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        oldRegionId: convertRegionId(event.oldRegionId),
        newRegionIds: convertRegionIds(event.newRegionIds),
    }));
}

function createInterlacedEntities(events: InterlacedEvent[]): Interlaced[] {
    return events.map(event => new Interlaced({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        oldRegionId: convertRegionId(event.oldRegionId),
        newRegionIds: convertRegionIds(event.newRegionIds),
    }));
}

function createAssignedEntities(events: AssignedEvent[]): Assigned[] {
    return events.map(event => new Assigned({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        regionId: convertRegionId(event.regionId), // Convert to the expected type
        duration: event.duration,
        task: event.task
    }));
}

function createPooledEntities(events: PooledEvent[]): Pooled[] {
    return events.map(event => new Pooled({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        regionId: convertRegionId(event.regionId),
        duration: event.duration
    }));
}

function createCoreCountRequestedEntities(events: CoreCountRequestedEvent[]): CoreCountRequested[] {
    return events.map(event => new CoreCountRequested({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        
    }));
}

function createCoreCountChangedEntities(events: CoreCountChangedEvent[]): CoreCountChanged[] {
    return events.map(event => new CoreCountChanged({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        coreCount: event.coreCount
    }));
}

function createReservationMadeEntities(events: ReservationMadeEvent[]): ReservationMade[] {
    return events.map(event => new ReservationMade({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        index: event.index,
        workload: event.workload.map(item => transformScheduleItem(item)) // Transform each ScheduleItem
    }));
}

function createReservationCancelledEntities(events: ReservationCancelledEvent[]): ReservationCancelled[] {
    return events.map(event => new ReservationCancelled({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        index: event.index,
        workload: event.workload.map(item => transformScheduleItem(item)) // Transform each ScheduleItem
    }));
}

function createLeasedEntities(events: LeasedEvent[]): Leased[] {
    return events.map(event => new Leased({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        task: event.task,
        until: event.until
    }));
}

function createLeaseEndingEntities(events: LeaseEndingEvent[]): LeaseEnding[] {
    return events.map(event => new LeaseEnding({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        task: event.task,
        when: event.when        
    }));
}

function createRevenueClaimBegunEntities(events: RevenueClaimBegunEvent[]): RevenueClaimBegun[] {
    return events.map(event => new RevenueClaimBegun({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        region: convertRegionId(event.region),
        maxTimeslices: event.maxTimeslices        
    }));
}

function createRevenueClaimItemEntities(events: RevenueClaimItemEvent[]): RevenueClaimItem[] {
    return events.map(event => new RevenueClaimItem({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        
    }));
}

function createRevenueClaimPaidEntities(events: RevenueClaimPaidEvent[]): RevenueClaimPaid[] {
    return events.map(event => new RevenueClaimPaid({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        amount: event.amount       
    }));
}

function createCreditPurchasedEntities(events: CreditPurchasedEvent[]): CreditPurchased[] {
    return events.map(event => new CreditPurchased({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        beneficiary: event.beneficiary,
        amount: event.amount
    }));
}

function createRegionDroppedEntities(events: RegionDroppedEvent[]): RegionDropped[] {
    return events.map(event => new RegionDropped({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        regionId: convertRegionId(event.regionId),
        duration: event.duration
    }));
}

function createContributionDroppedEntities(events: ContributionDroppedEvent[]): ContributionDropped[] {
    return events.map(event => new ContributionDropped({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        regionId: convertRegionId(event.regionId),
    }));
}

function createHistoryDroppedEntities(events: HistoryDroppedEvent[]): HistoryDropped[] {
    return events.map(event => new HistoryDropped({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        when: event.when,
        revenue: event.revenue
    }));
}

function createHistoryIgnoredEntities(events: HistoryIgnoredEvent[]): HistoryIgnored[] {
    return events.map(event => new HistoryIgnored({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        when: event.when,
        revenue: event.revenue
    }));
}

function createClaimsReadyEntities(events: ClaimsReadyEvent[]): ClaimsReady[] {
    return events.map(event => new ClaimsReady({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        when: event.when,
        systemPayout: event.systemPayout,
        privatePayout: event.privatePayout
    }));
}

function createCoreAssignedEntities(events: CoreAssignedEvent[]): CoreAssigned[] {
    return events.map(event => new CoreAssigned({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        core: event.core,
        when: event.when,
        assignment: transformCoreAssignments(event.assignment),
    }));
}

function createAllowedRenewalDroppedEntities(events: AllowedRenewalDroppedEvent[]): AllowedRenewalDropped[] {
    return events.map(event => new AllowedRenewalDropped({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        when: event.when,
        core: event.core
    }));
}

interface EntityCreationMap {
    [key: string]: (items: any[]) => any[];
}

export const entityBrokerEventCreators: EntityCreationMap = {
    historyInitialized: createHistoryInitializedEntities,
    saleInitialized: createSaleInitializedEntities,
    salesStarted: createSalesStartedEntities,
    purchased: createPurchasedEntities,
    renewable: createRenewableEntities,
    renewed: createRenewedEntities,
    transferred: createTransferredEntities,
    partitioned: createPartitionedEntities,
    interlaced: createInterlacedEntities,
    assigned: createAssignedEntities,
    pooled: createPooledEntities,
    coreCountRequested: createCoreCountRequestedEntities,
    coreCountChanged: createCoreCountChangedEntities,
    reservationMade: createReservationMadeEntities,
    reservationCancelled: createReservationCancelledEntities,
    leased: createLeasedEntities,
    leaseEnding: createLeaseEndingEntities,
    revenueClaimBegun: createRevenueClaimBegunEntities,
    revenueClaimItem: createRevenueClaimItemEntities,
    revenueClaimPaid: createRevenueClaimPaidEntities,
    creditPurchased: createCreditPurchasedEntities,
    regionDropped: createRegionDroppedEntities,
    contributionDropped: createContributionDroppedEntities,
    historyDropped: createHistoryDroppedEntities,
    historyIgnored: createHistoryIgnoredEntities,
    claimsReady: createClaimsReadyEntities,
    coreAssigned: createCoreAssignedEntities,
    allowedRenewalDropped: createAllowedRenewalDroppedEntities,
};