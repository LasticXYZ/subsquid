import { Call, Timepoint, Weight } from "../types/v9430";


interface AsMultiThreshold1Call {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    otherSignatories: string[];
    call: Call;
}

interface AsMulti {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    otherSignatories: string[];
    maybeTimepoint: Timepoint | null;
    call: Call;
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

interface CancelAsMultiCall {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
    threshold: number;
    timepoint: Timepoint;
    callHash: string;
}

export {
    AsMultiThreshold1Call,
    AsMulti,
    ApproveAsMultiCall,
    CancelAsMultiCall
}