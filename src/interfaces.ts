
// Define event interfaces

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

interface HistoryInitializedEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    when: number;
    privatePoolSize: number;
    systemPoolSize: number;
}

interface SaleInitializedEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    saleStart: number;
    leadinLength: number;
    startPrice: bigint;
    regularPrice: bigint;
    regionBegin: number;
    regionEnd: number;
    idealCoresSold: number;
    coresOffered: number;
}

interface SalesStartedEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    price: bigint;
    coreCount: number;
}


export { TransferEvent, HistoryInitializedEvent, SaleInitializedEvent, SalesStartedEvent}