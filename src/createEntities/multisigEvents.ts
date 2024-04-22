
import {
    NewMultisig,
    MultisigApproval,
    MultisigExecuted,
    MultisigCancelled,
    Timepoint,
    ResultType as ResultEntity
} from '../model'
import {In} from 'typeorm'
import {
    NewMultisigEvent,
    MultisigApprovalEvent,
    MultisigExecutedEvent,
    MultisigCancelledEvent
} from '../interfaces'

import { Timepoint as TimepointType } from "../types/v9430"

interface ResultType {
    __kind: string;
}

function convertResultType(result: ResultType): ResultEntity {
    return new ResultEntity({
        kind: result.__kind
    });
}

export function convertTimepoint(timepoint?: TimepointType): Timepoint {
    return new Timepoint({
        height: timepoint?.height,
        index: timepoint?.index
    });
}

function createNewMultisigntities(events: NewMultisigEvent[]): NewMultisig[] {
    return events.map(event => new NewMultisig({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        approving: event.approving.toString(),
        multisig: event.multisig.toString(),
        callHash: event.callHash
    }));
}

function createMultisigApprovalEntities(events: MultisigApprovalEvent[]): MultisigApproval[] {
    return events.map(event => new MultisigApproval({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        approving: event.approving.toString(),
        timepoint: convertTimepoint(event.timepoint),
        callHash: event.callHash
    }));
}

function createMultisigExecutedEntities(events: MultisigExecutedEvent[]): MultisigExecuted[] {
    return events.map(event => new MultisigExecuted({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        approving: event.approving.toString(),
        timepoint: convertTimepoint(event.timepoint),
        multisig: event.multisig.toString(),
        callHash: event.callHash,
        result: convertResultType(event.result)
    }));
}

function createMultisigCancelledEntities(events: MultisigCancelledEvent[]): MultisigCancelled[] {
    return events.map(event => new MultisigCancelled({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        cancelling: event.cancelling.toString(),
        timepoint: convertTimepoint(event.timepoint),
        multisig: event.multisig.toString(),
        callHash: event.callHash
    }));
}

interface EntityCreationMap {
    [key: string]: (items: any[]) => any[];
}

export const entityMultisigEventCreators: EntityCreationMap = {
    newMultisig: createNewMultisigntities,
    multisigApproval: createMultisigApprovalEntities,
    multisigExecuted: createMultisigExecutedEntities,
    multisigCancelled: createMultisigCancelledEntities,

};