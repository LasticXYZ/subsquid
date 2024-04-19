import { Call, Timepoint, Weight } from "../types/v9430";

interface AsMultiCall {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    otherSignatories: string[];
    maybeTimepoint?: Timepoint;
    callHash: string;
    maxWeight: Weight;
}

interface ApproveAsMultiCall {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    threshold: number;
    otherSignatories: string[];
    maybeTimepoint?: Timepoint;
    callHash: string;
    maxWeight: Weight;
}

export {
    AsMultiCall,
    ApproveAsMultiCall,
}