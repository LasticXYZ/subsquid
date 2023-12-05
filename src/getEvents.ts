import {processor, ProcessorContext} from './processor'
import { TransferEvent, HistoryInitializedEvent, SaleInitializedEvent, SalesStartedEvent } from './interfaces'
import { events } from './types'
import * as ss58 from '@subsquid/ss58'
import assert from 'assert'

import {TypeormDatabase, Store} from '@subsquid/typeorm-store'

function getTransferEvents(ctx: ProcessorContext<Store>): TransferEvent[] {
    // Filters and decodes the arriving events
    let transfers: TransferEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == events.balances.transfer.name) {
                let rec: {from: string; to: string; amount: bigint}
                if (events.balances.transfer.v268.is(event)) {
                    let [from, to, amount] = events.balances.transfer.v268.decode(event)
                    rec = {from, to, amount}
                }
                else {
                    throw new Error('Unsupported spec')
                }

                assert(block.header.timestamp, `Got an undefined timestamp at block ${block.header.height}`)

                transfers.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: event.extrinsic?.hash,
                    from: ss58.codec('kusama').encode(rec.from),
                    to: ss58.codec('kusama').encode(rec.to),
                    amount: rec.amount,
                    fee: event.extrinsic?.fee || 0n,
                })
            }
        }
    }
    return transfers
}

// Implement the logic to extract HistoryInitialized events
function getHistoryInitializedEvents(ctx: ProcessorContext<Store>): HistoryInitializedEvent[] {
    let events: HistoryInitializedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == events.broker.historyInitialized.name) {
                const decoded = events.broker.historyInitialized.decode(event) // adjust with actual decoder
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
            if (event.name == events.broker.saleInitialized.name) {
                const decoded = events.broker.saleInitialized.decode(event) // adjust with actual decoder
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
            if (event.name == events.broker.salesStarted.name) {
                const decoded = events.broker.salesStarted.decode(event) // adjust with actual decoder
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

export { getTransferEvents, getHistoryInitializedEvents, getSaleInitializedEvents, getSalesStartedEvents}
