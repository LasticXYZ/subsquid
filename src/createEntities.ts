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
import {In} from 'typeorm'
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

// ================================== Helper functions ================================================

import {RegionId as RegionIdForModel} from './model/generated/_regionId'
import {ScheduleItem as ScheduleItemModel} from './model/generated/_scheduleItem'
import {CoreAssignment as CoreAssignmentModel} from './model/generated/_coreAssignment'
import {CoreAssignmentKind} from "./model/generated/_coreAssignmentKind"
import {CoreAssignmentTuple as CoreAssignmentTupleModel} from './model/generated/_coreAssignmentTuple'
import {RegionIdPair as RegionIdPairModel} from './model/generated/_regionIdPair'
import {
    RegionId as RegionIdFromEvent,
    ScheduleItem as ScheduleItemEvent,
    CoreAssignment as CoreAssignmentEvent,
} from './types/v268'

import {Store} from '@subsquid/typeorm-store'

function convertRegionId(regionId: RegionIdFromEvent): RegionIdForModel {
    return new RegionIdForModel({
        begin: regionId.begin,
        core: regionId.core,
        mask: regionId.mask
    });
}

function transformCoreAssignment(assignment: CoreAssignmentEvent): CoreAssignmentModel {

    let kind: CoreAssignmentKind;
    let value: number | null = null;

    switch (assignment.__kind) {
        case 'Idle':
            kind = CoreAssignmentKind.Idle;
            break;
        case 'Pool':
            kind = CoreAssignmentKind.Pool;
            break;
        case 'Task':
            kind = CoreAssignmentKind.Task;
            value = assignment.value;
            break;
        default:
            throw new Error('Unknown CoreAssignment kind');
    }

    return new CoreAssignmentModel({ kind, value });

}

function transformScheduleItem(scheduledItem: ScheduleItemEvent): ScheduleItemModel {
    return new ScheduleItemModel({
        mask: scheduledItem.mask,
        assignment: scheduledItem.assignment ? transformCoreAssignment(scheduledItem.assignment) : undefined,
    });
}

function transformCoreAssignments(assignments: [CoreAssignmentEvent, number][]): CoreAssignmentTupleModel[] {
    return assignments.map(([assignment, value]) => {
        return new CoreAssignmentTupleModel({
            assignment: transformCoreAssignment(assignment),
            value: value
        });
    });
}

function convertRegionIds(regionIds: [RegionIdFromEvent, RegionIdFromEvent]): RegionIdPairModel {
    return new RegionIdPairModel({
        first: convertRegionId(regionIds[0]),
        second: convertRegionId(regionIds[1])
    });
}


// ====================================================================================================

async function createAccounts(ctx: ProcessorContext<Store>, transferEvents: TransferEvent[]): Promise<Map<string,Account>> {
    const accountIds = new Set<string>()
    for (let t of transferEvents) {
        accountIds.add(t.from)
        accountIds.add(t.to)
    }

    const accounts = await ctx.store.findBy(Account, {id: In([...accountIds])}).then((accounts) => {
        return new Map(accounts.map((a) => [a.id, a]))
    })

    for (let t of transferEvents) {
        updateAccounts(t.from)
        updateAccounts(t.to)
    }

    function updateAccounts(id: string): void {
        const acc = accounts.get(id)
        if (acc == null) {
            accounts.set(id, new Account({id}))
        }
    } 

    return accounts
}

function createTransfers(transferEvents: TransferEvent[], accounts: Map<string, Account>): Transfer[] {
    let transfers: Transfer[] = []
    for (let t of transferEvents) {
        let {id, blockNumber, timestamp, extrinsicHash, amount, fee} = t
        let from = accounts.get(t.from)
        let to = accounts.get(t.to)
        transfers.push(new Transfer({
            id,
            blockNumber,
            timestamp,
            extrinsicHash,
            from,
            to,
            amount,
            fee,
        }))
    }
    return transfers
}

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

export {
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
}