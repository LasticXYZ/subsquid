import { DispatchError, Timepoint, AccountId32 } from "../types/v9430"

interface ResultType {
    __kind: string;
}
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
    result: ResultType;
}

interface multisigCancelledEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    cancelling: AccountId32;
    timepoint: Timepoint;
    multisig: AccountId32;
    callHash?: string;
}


export {
    newMultisigEvent,
    multisigApprovalEvent,
    multisigExecutedEvent,
    multisigCancelledEvent
}
