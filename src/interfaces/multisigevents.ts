import { CoreAssignment, ScheduleItem, Timepoint, RegionId, AccountId32, V3Response } from "../types/v9430"

interface newMultisigEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    approving: AccountId32;
    multisig: AccountId32;
    callHash?: string;
}

interface multisigApprovalEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    approving: AccountId32;
    timepoint: Timepoint;
    callHash?: string;
}

interface multisigExecutedEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    approving: AccountId32;
    timepoint: Timepoint;
    multisig: AccountId32;
    callHash?: string;
    result: V3Response;
}

interface multisigCancelledEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    
}


export {
    newMultisigEvent,
    multisigApprovalEvent,
    multisigExecutedEvent,
    multisigCancelledEvent
}
