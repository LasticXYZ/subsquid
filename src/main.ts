import {TypeormDatabase, Store} from '@subsquid/typeorm-store'
import {In} from 'typeorm'
import * as ss58 from '@subsquid/ss58'
import assert from 'assert'

import {processor, ProcessorContext} from './processor'
import {Account, Transfer, HistoryInitialized, SaleInitialized, SalesStarted} from './model'
import {events} from './types'
import { HistoryInitializedEvent, SaleInitializedEvent, SalesStartedEvent } from './interfaces'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    let transferEvents: TransferEvent[] = getTransferEvents(ctx)

    let historyInitializedEvents: HistoryInitializedEvent[] = getHistoryInitializedEvents(ctx)
    let saleInitializedEvents: SaleInitializedEvent[] = getSaleInitializedEvents(ctx)
    let salesStartedEvents: SalesStartedEvent[] = getSalesStartedEvents(ctx)


    let accounts: Map<string, Account> = await createAccounts(ctx, transferEvents)
    let transfers: Transfer[] = createTransfers(transferEvents, accounts)

    // Create entities for broker events
    let historyInitializedEntities = createHistoryInitializedEntities(historyInitializedEvents)
    let saleInitializedEntities = createSaleInitializedEntities(saleInitializedEvents)
    let salesStartedEntities = createSalesStartedEntities(salesStartedEvents)


    await ctx.store.upsert([...accounts.values()])
    await ctx.store.insert([...transfers, ...historyInitializedEntities, ...saleInitializedEntities, ...salesStartedEntities])
})

interface TransferEvent {
    id: string
    blockNumber: number
    timestamp: Date
    extrinsicHash?: string
    from: string
    to: string
    amount: bigint
    fee?: bigint
}

function getTransferEvents(ctx: ProcessorContext<Store>): TransferEvent[] {
    // Filters and decodes the arriving events
    let transfers: TransferEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == events.balances.transfer.name) {
                let rec: {from: string; to: string; amount: bigint}
                if (events.balances.transfer.v1020.is(event)) {
                    let [from, to, amount] = events.balances.transfer.v1020.decode(event)
                    rec = {from, to, amount}
                }
                else if (events.balances.transfer.v1050.is(event)) {
                    let [from, to, amount] = events.balances.transfer.v1050.decode(event)
                    rec = {from, to, amount}
                }
                else if (events.balances.transfer.v9130.is(event)) {
                    rec = events.balances.transfer.v9130.decode(event)
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


// Implement the logic to create HistoryInitialized entities from events
function createHistoryInitializedEntities(events: HistoryInitializedEvent[]): HistoryInitialized[] {
    return events.map(event => new HistoryInitialized({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        extrinsicHash: event.extrinsicHash,
        when: BigInt(event.when),
        privatePoolSize: BigInt(event.privatePoolSize),
        systemPoolSize: BigInt(event.systemPoolSize)
    }));
}

// Implement the logic to create SaleInitialized entities from events
function createSaleInitializedEntities(events: SaleInitializedEvent[]): SaleInitialized[] {
    return events.map(event => new SaleInitialized({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        extrinsicHash: event.extrinsicHash,
        saleStart: BigInt(event.saleStart),
        leadinLength: parseInt(event.leadinLength),
        startPrice: BigInt(event.startPrice),
        regularPrice: BigInt(event.regularPrice),
        regionBegin: BigInt(event.regionBegin),
        regionEnd: BigInt(event.regionEnd),
        idealCoresSold: parseInt(event.idealCoresSold),
        coresOffered: parseInt(event.coresOffered)
    }));
}

// Implement the logic to create SalesStarted entities from events
function createSalesStartedEntities(events: SalesStartedEvent[]): SalesStarted[] {
    return events.map(event => new SalesStarted({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        extrinsicHash: event.extrinsicHash,
        price: BigInt(event.price),
        coreCount: parseInt(event.coreCount)
    }));
}