import {processor, ProcessorContext} from '../processor'
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
import * as ss58 from '@subsquid/ss58'
import assert from 'assert'
import {
    historyInitialized,
    saleInitialized,
    salesStarted,
    purchased,
    renewable,
    renewed,
    transferred,
    partitioned,
    interlaced,
    assigned,
    pooled,
    coreCountRequested,
    coreCountChanged,
    reservationMade,
    reservationCancelled,
    leased,
    leaseEnding,
    revenueClaimBegun,
    revenueClaimItem,
    revenueClaimPaid,
    creditPurchased,
    regionDropped,
    contributionDropped,
    historyDropped,
    historyIgnored,
    claimsReady,
    coreAssigned,
    allowedRenewalDropped
} from '../types/broker/events'

import {Store} from '@subsquid/typeorm-store'

// Implement the logic to extract HistoryInitialized events
function getHistoryInitializedEvents(ctx: ProcessorContext<Store>): HistoryInitializedEvent[] {
    let events: HistoryInitializedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == historyInitialized.name) {
                const decoded = historyInitialized.v268.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: event.extrinsic?.hash,
                    when: decoded.when,
                    privatePoolSize: decoded.privatePoolSize,
                    systemPoolSize: decoded.systemPoolSize
                })
            }
        }
    }
    return events
}

function getSaleInitializedEvents(ctx: ProcessorContext<Store>): SaleInitializedEvent[] {
    let events: SaleInitializedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == saleInitialized.name) {
                const decoded = saleInitialized.v268.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)
                
                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: event.extrinsic?.hash,
                    saleStart: decoded.saleStart,
                    leadinLength: decoded.leadinLength,
                    startPrice: decoded.startPrice,
                    regularPrice: decoded.regularPrice,
                    regionBegin: decoded.regionBegin,
                    regionEnd: decoded.regionEnd,
                    idealCoresSold: decoded.idealCoresSold,
                    coresOffered: decoded.coresOffered
                })
            }
        }
    }
    return events
}

// Implement the logic to extract SalesStarted events
function getSalesStartedEvents(ctx: ProcessorContext<Store>): SalesStartedEvent[] {
    let events: SalesStartedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == salesStarted.name) {
                const decoded = salesStarted.v268.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)
                
                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: event.extrinsic?.hash,
                    price: decoded.price,
                    coreCount: decoded.coreCount
                })
            }
        }
    }
    return events
}

function getPurchasedEvents(ctx: ProcessorContext<Store>): PurchasedEvent[] {
    let events: PurchasedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == purchased.name) {
                const decoded = purchased.v268.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)
                
                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec('kusama').encode(decoded.who),
                    regionId: decoded.regionId,
                    price: decoded.price,
                    duration: decoded.duration
                })
            }
        }
    }
    return events
}

function getRenewableEvents(ctx: ProcessorContext<Store>): RenewableEvent[] {
    let events: RenewableEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == renewable.name) {
                const decoded = renewable.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    core: decoded.core,
                    price: decoded.price,
                    begin: decoded.begin,
                    workload: decoded.workload // Assuming workload is directly decoded
                })
            }
        }
    }
    return events
}

function getRenewedEvents(ctx: ProcessorContext<Store>): RenewedEvent[] {
    let events: RenewedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == renewed.name) {
                const decoded = renewed.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec('kusama').encode(decoded.who),
                    price: decoded.price,
                    oldCore: decoded.oldCore,
                    core: decoded.core,
                    begin: decoded.begin,
                    duration: decoded.duration,
                    workload: decoded.workload // Assuming workload is directly decoded
                })
            }
        }
    }

    return events
}

function getTransferredEvents(ctx: ProcessorContext<Store>): TransferredEvent[] {
    let events: TransferredEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == transferred.name) {
                const decoded = transferred.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    regionId: decoded.regionId,
                    duration: decoded.duration,
                    oldOwner: ss58.codec('kusama').encode(decoded.oldOwner),
                    owner: ss58.codec('kusama').encode(decoded.owner)
                })
            }
        }
    }

    return events
}

function getPartitionedEvents(ctx: ProcessorContext<Store>): PartitionedEvent[] {
    let events: PartitionedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == partitioned.name) {
                const decoded = partitioned.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    oldRegionId: decoded.oldRegionId,
                    newRegionIds: decoded.newRegionIds
                })
            }
        }
    }
    return events
}

function getInterlacedEvents(ctx: ProcessorContext<Store>): InterlacedEvent[] {
    let events: InterlacedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == interlaced.name) {
                const decoded = interlaced.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    oldRegionId: decoded.oldRegionId,
                    newRegionIds: decoded.newRegionIds
                })
            }
        }
    }

    return events
}

function getAssignedEvents(ctx: ProcessorContext<Store>): AssignedEvent[] {
    let events: AssignedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == assigned.name) {
                const decoded = assigned.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    regionId: decoded.regionId,
                    duration: decoded.duration,
                    task: decoded.task
                })
            }
        }
    }

    return events
}

function getPooledEvents(ctx: ProcessorContext<Store>): PooledEvent[] {
    let events: PooledEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == pooled.name) {
                const decoded = pooled.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    regionId: decoded.regionId,
                    duration: decoded.duration,
                })
            }
        }
    }

    return events
}

function getCoreCountRequestedEvents(ctx: ProcessorContext<Store>): CoreCountRequestedEvent[] {
    let events: CoreCountRequestedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == coreCountRequested.name) {
                const decoded = coreCountRequested.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    coreCount: decoded.coreCount
                })
            }
        }
    }

    return events
}

function getCoreCountChangedEvents(ctx: ProcessorContext<Store>): CoreCountChangedEvent[] {
    let events: CoreCountChangedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == coreCountChanged.name) {
                const decoded = coreCountChanged.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    coreCount: decoded.coreCount
                })
            }
        }
    }

    return events
}

function getReservationMadeEvents(ctx: ProcessorContext<Store>): ReservationMadeEvent[] {
    let events: ReservationMadeEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == reservationMade.name) {
                const decoded = reservationMade.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    index: decoded.index,
                    workload: decoded.workload.map(w => ({ mask: w.mask, assignment: w.assignment })) // Assuming ScheduleItem[] mapping
                })
            }
        }
    }
    return events
}

function getReservationCancelledEvents(ctx: ProcessorContext<Store>): ReservationCancelledEvent[] {
    let events: ReservationCancelledEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == reservationCancelled.name) {
                const decoded = reservationCancelled.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    index: decoded.index,
                    workload: decoded.workload.map(w => ({ mask: w.mask, assignment: w.assignment })) // Assuming ScheduleItem[] mapping
                })
            }
        }
    }

    return events
}

function getLeasedEvents(ctx: ProcessorContext<Store>): LeasedEvent[] {
    let events: LeasedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == leased.name) {
                const decoded = leased.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    task: decoded.task,
                    until: decoded.until
                })
            }
        }
    }

    return events
}

function getLeaseEndingEvents(ctx: ProcessorContext<Store>): LeaseEndingEvent[] {
    let events: LeaseEndingEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == leaseEnding.name) {
                const decoded = leaseEnding.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    timestamp: new Date(block.header.timestamp),
                    blockNumber: block.header.height,
                    task: decoded.task,
                    when: decoded.when
                })
            }
        }
    }

    return events
}

function getRevenueClaimBegunEvents(ctx: ProcessorContext<Store>): RevenueClaimBegunEvent[] {
    let events: RevenueClaimBegunEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == revenueClaimBegun.name) {
                const decoded = revenueClaimBegun.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    region: decoded.region,
                    maxTimeslices: decoded.maxTimeslices
                })
            }
        }
    }

    return events
}

function getRevenueClaimItemEvents(ctx: ProcessorContext<Store>): RevenueClaimItemEvent[] {
    let events: RevenueClaimItemEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == revenueClaimItem.name) {
                const decoded = revenueClaimItem.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    when: decoded.when,
                    amount: decoded.amount
                })
            }
        }
    }

    return events
}

function getRevenueClaimPaidEvents(ctx: ProcessorContext<Store>): RevenueClaimPaidEvent[] {
    let events: RevenueClaimPaidEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == revenueClaimPaid.name) {
                const decoded = revenueClaimPaid.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec('kusama').encode(decoded.who),
                    amount: decoded.amount,
                    next: decoded.next ? decoded.next : null
                })
            }
        }
    }

    return events
}

function getCreditPurchasedEvents(ctx: ProcessorContext<Store>): CreditPurchasedEvent[] {
    let events: CreditPurchasedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == creditPurchased.name) {
                const decoded = creditPurchased.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec('kusama').encode(decoded.who),
                    beneficiary: ss58.codec('kusama').encode(decoded.beneficiary),
                    amount: decoded.amount
                })
            }
        }
    }

    return events
}

function getRegionDroppedEvents(ctx: ProcessorContext<Store>): RegionDroppedEvent[] {
    let events: RegionDroppedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == regionDropped.name) {
                const decoded = regionDropped.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    regionId: decoded.regionId,
                    duration: decoded.duration
                })
            }
        }
    }

    return events
}

function getContributionDroppedEvents(ctx: ProcessorContext<Store>): ContributionDroppedEvent[] {
    let events: ContributionDroppedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == contributionDropped.name) {
                const decoded = contributionDropped.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    regionId: decoded.regionId
                })
            }
        }
    }

    return events
}

function getHistoryDroppedEvents(ctx: ProcessorContext<Store>): HistoryDroppedEvent[] {
    let events: HistoryDroppedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == historyDropped.name) {
                const decoded = historyDropped.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    when: decoded.when,
                    revenue: decoded.revenue
                })
            }
        }
    }

    return events
}

function getHistoryIgnoredEvents(ctx: ProcessorContext<Store>): HistoryIgnoredEvent[] {
    let events: HistoryIgnoredEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == historyIgnored.name) {
                const decoded = historyIgnored.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    when: decoded.when,
                    revenue: decoded.revenue
                })
            }
        }
    }

    return events
}

function getClaimsReadyEvents(ctx: ProcessorContext<Store>): ClaimsReadyEvent[] {
    let events: ClaimsReadyEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == claimsReady.name) {
                const decoded = claimsReady.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    when: decoded.when,
                    systemPayout: decoded.systemPayout,
                    privatePayout: decoded.privatePayout
                })
            }
        }
    }

    return events
}

function getCoreAssignedEvents(ctx: ProcessorContext<Store>): CoreAssignedEvent[] {
    let events: CoreAssignedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == coreAssigned.name) {
                const decoded = coreAssigned.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    timestamp: new Date(block.header.timestamp),
                    blockNumber: block.header.height,
                    core: decoded.core,
                    when: decoded.when,
                    assignment: decoded.assignment
                })
            }
        }
    }

    return events
}

function getAllowedRenewalDroppedEvents(ctx: ProcessorContext<Store>): AllowedRenewalDroppedEvent[] {
    let events: AllowedRenewalDroppedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == allowedRenewalDropped.name) {
                const decoded = allowedRenewalDropped.v268.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    when: decoded.when,
                    core: decoded.core
                })
            }
        }
    }

    return events
}


export { 
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
}
