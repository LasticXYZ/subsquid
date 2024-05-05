import { ProcessorContext } from '../processor'
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
    AllowedRenewalDroppedEvent,
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
import { decodeEvent } from './helper'
import { ReservationMade } from '../model'



// Implement the logic to extract HistoryInitialized events
// History initialized commented out, mainly because it is called the most amount of times
// and it is not used at all
// function getHistoryInitializedEvents(ctx: ProcessorContext<Store>): HistoryInitializedEvent[] {
//     let events: HistoryInitializedEvent[] = []
//     for (let block of ctx.blocks) {
//         for (let event of block.events) {
//             if (event.name == historyInitialized.name) {
//                 const decoded = decodeEvent(event, historyInitialized)
//                 //const decoded = historyInitialized.v9430.decode(event) // adjust with actual decoder
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
                //const decoded = saleInitialized.v9430.decode(event) // adjust with actual decoder
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
                //const decoded = salesStarted.v9430.decode(event) // adjust with actual decoder
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
                //const decoded = purchased.v9430.decode(event) // adjust with actual decoder
                const decoded = decodeEvent(event, purchased)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)
                
                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.who),
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
                    who: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.who),
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
                // let decoded;
                // if (transferred.v9430.is(event)) {
                //     // Check if the event transferred is of the v9430 type
                //     decoded = transferred.v9430.decode(event)
                // }
                // else if (transferred.v1011000.is(event)) {
                //     // Check if the event transferred is of the v1011000 type
                //     console.log('Transferred event is of type v1011000')
                //     decoded = transferred.v1011000.decode(event)
                // }
                if (decoded) {
                    assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                    events.push({
                        id: event.id, 
                        blockNumber: block.header.height,
                        timestamp: new Date(block.header.timestamp),
                        regionId: decoded.regionId,
                        duration: decoded.duration,
                        oldOwner: decoded.oldOwner ? ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.oldOwner) : undefined,
                        owner: decoded.owner ? ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.owner) : undefined
                    })
                }
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
                //const decoded = partitioned.v9430.decode(event)
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
                //const decoded = interlaced.v9430.decode(event)
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
                //const decoded = assigned.v9430.decode(event)
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
                //const decoded = pooled.v9430.decode(event)
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
                //const decoded = coreCountRequested.v9430.decode(event)
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
                //const decoded = coreCountChanged.v9430.decode(event)
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
                const decoded = decodeEvent(event, ReservationMade)
                //const decoded = reservationMade.v9430.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    index: decoded.index,
                    workload: decoded.workload.map((w: any) => ({ mask: w.mask, assignment: w.assignment })) // Assuming ScheduleItem[] mapping
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
                //const decoded = reservationCancelled.v9430.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    index: decoded.index,
                    workload: decoded.workload.map((w: any) => ({ mask: w.mask, assignment: w.assignment })) // Assuming ScheduleItem[] mapping
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
                //const decoded = leased.v9430.decode(event)
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
                //const decoded = leaseEnding.v9430.decode(event)
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
                //const decoded = revenueClaimBegun.v9430.decode(event)
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
                //const decoded = revenueClaimItem.v9430.decode(event)
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
                //const decoded = revenueClaimPaid.v9430.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.who),
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
                //const decoded = creditPurchased.v9430.decode(event)
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id, 
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    who: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.who),
                    beneficiary: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.beneficiary),
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
                //const decoded = regionDropped.v9430.decode(event)
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
                //const decoded = contributionDropped.v9430.decode(event)
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
                //const decoded = historyDropped.v9430.decode(event)
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
                //const decoded = historyIgnored.v9430.decode(event)
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
                //const decoded = claimsReady.v9430.decode(event)
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
                //const decoded = coreAssigned.v9430.decode(event)
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
                //const decoded = allowedRenewalDropped.v9430.decode(event)
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
    //historyInitialized: getHistoryInitializedEvents,
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