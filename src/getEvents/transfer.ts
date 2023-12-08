import {processor, ProcessorContext} from '../processor'
import { TransferEvent, HistoryInitializedEvent, SaleInitializedEvent, SalesStartedEvent } from '../interfaces'
import { events } from '../types'
import * as ss58 from '@subsquid/ss58'
import assert from 'assert'
import { historyInitialized, saleInitialized, salesStarted } from '../types/broker/events'

import {Store} from '@subsquid/typeorm-store'

function getTransferEvents(ctx: ProcessorContext<Store>): TransferEvent[] {
    // Filters and decodes the arriving events
    let transfers: TransferEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == events.balances.transfer.name) {
                let rec: {from: string; to: string; amount: bigint}
                if (events.balances.transfer.v268.is(event)) {
                    rec = events.balances.transfer.v268.decode(event)
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

export { getTransferEvents }