import {processor, ProcessorContext} from './processor'
import {Account, Transfer, HistoryInitialized, SaleInitialized, SalesStarted} from './model'
import {In} from 'typeorm'
import { TransferEvent, HistoryInitializedEvent, SaleInitializedEvent, SalesStartedEvent } from './interfaces'

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
        leadinLength: event.leadinLength,
        startPrice: BigInt(event.startPrice),
        regularPrice: BigInt(event.regularPrice),
        regionBegin: BigInt(event.regionBegin),
        regionEnd: BigInt(event.regionEnd),
        idealCoresSold: event.idealCoresSold,
        coresOffered: event.coresOffered
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
        coreCount: event.coreCount
    }));
}

export {createAccounts, createTransfers, createHistoryInitializedEntities, createSaleInitializedEntities, createSalesStartedEntities}