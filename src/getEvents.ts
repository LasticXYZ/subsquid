// ... existing imports ...

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

// Implement the logic to extract SaleInitialized events
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
                    // ... map other fields similarly ...
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
                    // ... map other fields similarly ...
                })
            }
        }
    }
    return events
}

export { getHistoryInitializedEvents, getSaleInitializedEvents, getSalesStartedEvents}