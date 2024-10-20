import { ProcessorContext } from '../processor'
import {
    // HistoryInitializedEvent,
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
 } from '../interfaces'
import * as ss58 from '@subsquid/ss58'
import assert from 'assert'
import {
    // historyInitialized,
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
import { getChainConfig } from '../const'
import { decodeEvent } from './helper'

// // Implement the logic to extract HistoryInitialized events
// function getHistoryInitializedEvents(ctx: ProcessorContext<Store>): HistoryInitializedEvent[] {
//     let events: HistoryInitializedEvent[] = []
//     for (let block of ctx.blocks) {
//         for (let event of block.events) {
//             if (event.name == historyInitialized.name) {
//                 const decoded = decodeEvent(event, historyInitialized)
//                 assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

//                 events.push({
//                     id: event.id,
//                     blockNumber: block.header.height,
//                     timestamp: new Date(block.header.timestamp),
//                     extrinsicHash: event.extrinsic?.hash,
//                     when: decoded.when,
//                     privatePoolSize: decoded.privatePoolSize,
//                     systemPoolSize: decoded.systemPoolSize
//                 })
//             }
//         }
//     }
//     return events
// }

function getSaleInitializedEvents(ctx: ProcessorContext<Store>): SaleInitializedEvent[] {
    let events: SaleInitializedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == saleInitialized.name) {
                const decoded = decodeEvent(event, saleInitialized)
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
                const decoded = decodeEvent(event, salesStarted)
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
                const decoded = decodeEvent(event, purchased)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)
                
                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec(getChainConfig().prefix).encode(decoded.who),
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
                // if (!renewable.v1002000.is(event)) {
                const decoded = decodeEvent(event, renewable)
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
                const decoded = decodeEvent(event, renewed)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec(getChainConfig().prefix).encode(decoded.who),
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
                const decoded = decodeEvent(event, transferred)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    regionId: decoded.regionId,
                    duration: decoded.duration,
                    oldOwner: ss58.codec(getChainConfig().prefix).encode(decoded.oldOwner),
                    owner: ss58.codec(getChainConfig().prefix).encode(decoded.owner)
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
                const decoded = decodeEvent(event, partitioned)
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
                const decoded = decodeEvent(event, interlaced)
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
                const decoded = decodeEvent(event, assigned)
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
                const decoded = decodeEvent(event, pooled)
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
                const decoded = decodeEvent(event, coreCountRequested)
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
                const decoded = decodeEvent(event, coreCountChanged)
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
                const decoded = decodeEvent(event, reservationMade)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    index: decoded.index,
                    workload: decoded.workload.map((w: { mask: any; assignment: any }) => ({ mask: w.mask, assignment: w.assignment })) // Assuming ScheduleItem[] mapping
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
                const decoded = decodeEvent(event, reservationCancelled)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    index: decoded.index,
                    workload: decoded.workload.map((w: { mask: any; assignment: any }) => ({ mask: w.mask, assignment: w.assignment })) // Assuming ScheduleItem[] mapping
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
                const decoded = decodeEvent(event, leased)
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
                const decoded = decodeEvent(event, leaseEnding)
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
                const decoded = decodeEvent(event, revenueClaimBegun)
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
                const decoded = decodeEvent(event, revenueClaimItem)
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
                const decoded = decodeEvent(event, revenueClaimPaid)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec(getChainConfig().prefix).encode(decoded.who),
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
                const decoded = decodeEvent(event, creditPurchased)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec(getChainConfig().prefix).encode(decoded.who),
                    beneficiary: ss58.codec(getChainConfig().prefix).encode(decoded.beneficiary),
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
                const decoded = decodeEvent(event, regionDropped)
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
                const decoded = decodeEvent(event, contributionDropped)
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
                const decoded = decodeEvent(event, historyDropped)
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
                const decoded = decodeEvent(event, historyIgnored)
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
                const decoded = decodeEvent(event, claimsReady)
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
                const decoded = decodeEvent(event, coreAssigned)
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
                const decoded = decodeEvent(event, allowedRenewalDropped)
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

interface EntityMap {
    [key: string]: any;
}


export const brokerEventFetchers: EntityMap = {
    // historyInitialized: getHistoryInitializedEvents,
    saleInitialized: getSaleInitializedEvents,
    salesStarted: getSalesStartedEvents,
    purchased: getPurchasedEvents,
    renewable: getRenewableEvents,
    renewed: getRenewedEvents,
    transferred: getTransferredEvents,
    partitioned: getPartitionedEvents,
    interlaced: getInterlacedEvents,
    assigned: getAssignedEvents,
    pooled: getPooledEvents,
    coreCountRequested: getCoreCountRequestedEvents,
    coreCountChanged: getCoreCountChangedEvents,
    reservationMade: getReservationMadeEvents,
    reservationCancelled: getReservationCancelledEvents,
    leased: getLeasedEvents,
    leaseEnding: getLeaseEndingEvents,
    revenueClaimBegun: getRevenueClaimBegunEvents,
    revenueClaimItem: getRevenueClaimItemEvents,
    revenueClaimPaid: getRevenueClaimPaidEvents,
    creditPurchased: getCreditPurchasedEvents,
    regionDropped: getRegionDroppedEvents,
    contributionDropped: getContributionDroppedEvents,
    historyDropped: getHistoryDroppedEvents,
    historyIgnored: getHistoryIgnoredEvents,
    claimsReady: getClaimsReadyEvents,
    coreAssigned: getCoreAssignedEvents,
    allowedRenewalDropped: getAllowedRenewalDroppedEvents,
};