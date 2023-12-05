import {TypeormDatabase, Store} from '@subsquid/typeorm-store'

import {processor, ProcessorContext} from './processor'
import {Account, Transfer, HistoryInitialized, SaleInitialized, SalesStarted} from './model'
import { TransferEvent, HistoryInitializedEvent, SaleInitializedEvent, SalesStartedEvent } from './interfaces'
import { getTransferEvents, getHistoryInitializedEvents, getSaleInitializedEvents, getSalesStartedEvents } from './getEvents'
import { createAccounts, createTransfers, createHistoryInitializedEntities, createSaleInitializedEntities, createSalesStartedEntities } from './createEvents'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    let transferEvents: TransferEvent[] = getTransferEvents(ctx)

    let historyInitializedEvents: HistoryInitializedEvent[] = getHistoryInitializedEvents(ctx)
    let saleInitializedEvents: SaleInitializedEvent[] = getSaleInitializedEvents(ctx)
    let salesStartedEvents: SalesStartedEvent[] = getSalesStartedEvents(ctx)


    let accounts: Map<string, Account> = await createAccounts(ctx, transferEvents)
    let transfers: Transfer[] = createTransfers(transferEvents, accounts)

    // Create entities for broker events
    let historyInitializedEntities: HistoryInitialized[] = createHistoryInitializedEntities(historyInitializedEvents)
    let saleInitializedEntities: SaleInitialized[] = createSaleInitializedEntities(saleInitializedEvents)
    let salesStartedEntities: SalesStarted[] = createSalesStartedEntities(salesStartedEvents)


    await ctx.store.upsert([...accounts.values()])
    await ctx.store.insert([...transfers, ...historyInitializedEntities, ...saleInitializedEntities, ...salesStartedEntities])
})

