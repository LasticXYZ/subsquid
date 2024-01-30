import {processor, ProcessorContext} from '../processor'
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
} from '../model'
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
    AllowedRenewalDroppedEvent,
    PurchaseCall

} from '../interfaces'

import {Store} from '@subsquid/typeorm-store'
import {
    convertRegionId, 
    convertRegionIds, 
    transformScheduleItem, 
    transformCoreAssignments
} from './helper'

function createPurchaseCallEntities(transferEvents: TransferEvent[], accounts: Map<string, Account>): Transfer[] {
    let transfers: [] = []
    for (let t of transferEvents) {
        let {id, blockNumber, timestamp, extrinsicHash, amount, fee} = t
        let from = accounts.get(t.from)
        let to = accounts.get(t.to)
        transfers.push(new ({
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


export {
    createPurchaseCallEntity
}