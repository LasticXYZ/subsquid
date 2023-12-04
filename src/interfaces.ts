// Define event interfaces
interface HistoryInitializedEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    when: string;
    privatePoolSize: string;
    systemPoolSize: string;
}

interface SaleInitializedEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    saleStart: string;
    leadinLength: string;
    startPrice: string;
    regularPrice: string;
    regionBegin: string;
    regionEnd: string;
    idealCoresSold: string;
    coresOffered: string;
}

interface SalesStartedEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    price: string;
    coreCount: string;
}


export { HistoryInitializedEvent, SaleInitializedEvent, SalesStartedEvent}