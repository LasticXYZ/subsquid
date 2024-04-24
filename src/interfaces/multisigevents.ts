import { DispatchError, Timepoint, AccountId32 } from "../types/v1002000"

interface ResultType {
    __kind: string;
}
interface NewMultisigEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    approving: AccountId32;
    multisig: AccountId32;
    callHash?: string;
}

interface MultisigApprovalEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    approving: AccountId32;
    timepoint: Timepoint;
    callHash?: string;
}

interface MultisigExecutedEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    approving: AccountId32;
    timepoint: Timepoint;
    multisig: AccountId32;
    callHash?: string;
    result: ResultType;
}

interface MultisigCancelledEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    cancelling: AccountId32;
    timepoint: Timepoint;
    multisig: AccountId32;
    callHash?: string;
}


export {
    NewMultisigEvent,
    MultisigApprovalEvent,
    MultisigExecutedEvent,
    MultisigCancelledEvent
}
