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

import {TypeormDatabase, Store} from '@subsquid/typeorm-store'

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
        privatePoolSize: event.privatePoolSize,
        systemPoolSize: event.systemPoolSize
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
        regionId: event.regionId,
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
        workload: event.workload
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
        workload: event.workload
    }));
}

function createTransferredEntities(events: TransferredEvent[]): Transferred[] {
    return events.map(event => new Transferred({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        regionId: event.regionId,
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
        who: event.who,
        regionId: event.regionId,
        price: event.price,
        duration: event.duration
    }));
}

function createInterlacedEntities(events: InterlacedEvent[]): Interlaced[] {
    return events.map(event => new Interlaced({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        regionId: event.regionId,
        price: event.price,
        duration: event.duration
    }));
}

function createAssignedEntities(events: AssignedEvent[]): Assigned[] {
    return events.map(event => new Assigned({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        regionId: event.regionId,
        core: event.core
    }));
}

function createPooledEntities(events: PooledEvent[]): Pooled[] {
    return events.map(event => new Pooled({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        core: event.core
    }));
}

function createCoreCountRequestedEntities(events: CoreCountRequestedEvent[]): CoreCountRequested[] {
    return events.map(event => new CoreCountRequested({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        core: event.core
    }));
}

function createCoreCountChangedEntities(events: CoreCountChangedEvent[]): CoreCountChanged[] {
    return events.map(event => new CoreCountChanged({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        core: event.core
    }));
}

function createReservationMadeEntities(events: ReservationMadeEvent[]): ReservationMade[] {
    return events.map(event => new ReservationMade({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        core: event.core,
        duration: event.duration
    }));
}

function createReservationCancelledEntities(events: ReservationCancelledEvent[]): ReservationCancelled[] {
    return events.map(event => new ReservationCancelled({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        core: event.core,
        duration: event.duration
    }));
}

function createLeasedEntities(events: LeasedEvent[]): Leased[] {
    return events.map(event => new Leased({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        core: event.core,
        until: event.until
    }));
}

function createLeaseEndingEntities(events: LeaseEndingEvent[]): LeaseEnding[] {
    return events.map(event => new LeaseEnding({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        core: event.core,
        when: event.when
    }));
}

function createRevenueClaimBegunEntities(events: RevenueClaimBegunEvent[]): RevenueClaimBegun[] {
    return events.map(event => new RevenueClaimBegun({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        regionId: event.regionId
    }));
}

function createRevenueClaimItemEntities(events: RevenueClaimItemEvent[]): RevenueClaimItem[] {
    return events.map(event => new RevenueClaimItem({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        claimId: event.claimId,
        core: event.core,
        amount: event.amount
    }));
}

function createRevenueClaimPaidEntities(events: RevenueClaimPaidEvent[]): RevenueClaimPaid[] {
    return events.map(event => new RevenueClaimPaid({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        claimId: event.claimId,
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
        regionId: event.regionId,
        duration: event.duration
    }));
}

function createContributionDroppedEntities(events: ContributionDroppedEvent[]): ContributionDropped[] {
    return events.map(event => new ContributionDropped({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        regionId: event.regionId,
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
        when: event.when
    }));
}

function createCoreAssignedEntities(events: CoreAssignedEvent[]): CoreAssigned[] {
    return events.map(event => new CoreAssigned({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        who: event.who,
        core: event.core
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