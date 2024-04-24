import { ProcessorContext } from '../processor'
import {
    NewMultisigEvent,
    MultisigApprovalEvent,
    MultisigExecutedEvent,
    MultisigCancelledEvent
 } from '../interfaces'
import * as ss58 from '@subsquid/ss58'
import assert from 'assert'
import {
    newMultisig,
    multisigApproval,
    multisigExecuted,
    multisigCancelled
} from '../types/multisig/events'

import {Store} from '@subsquid/typeorm-store'
import { getChainConfig } from '../const'

// Implement the logic to extract NewMultisigEvents events
function getNewMultisigEvents(ctx: ProcessorContext<Store>): NewMultisigEvent[] {
    let events: NewMultisigEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == newMultisig.name) {
                const decoded = newMultisig.coretimeRococoV9430.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    approving: ss58.codec(getChainConfig().prefix).encode(decoded.approving),
                    multisig: ss58.codec(getChainConfig().prefix).encode(decoded.multisig),
                    callHash: event.extrinsic?.hash
                })
            }
        }
    }
    return events
}

// Implement the logic to extract MultisigApproval events
function getMultisigApprovalEvents(ctx: ProcessorContext<Store>): MultisigApprovalEvent[] {
    let events: MultisigApprovalEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == multisigApproval.name) {
                const decoded = multisigApproval.coretimeRococoV9430.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    approving: ss58.codec(getChainConfig().prefix).encode(decoded.approving),
                    timepoint: decoded.timepoint,
                    callHash: event.extrinsic?.hash
                })
            }
        }
    }
    return events
}

// Implement the logic to extract MultisigExecuted events
function getMultisigExecutedEvents(ctx: ProcessorContext<Store>): MultisigExecutedEvent[] {
    let events: MultisigExecutedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == multisigExecuted.name) {
                const decoded = multisigExecuted.coretimeRococoV9430.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    approving: ss58.codec(getChainConfig().prefix).encode(decoded.approving),
                    timepoint: decoded.timepoint,
                    multisig: ss58.codec(getChainConfig().prefix).encode(decoded.multisig),
                    callHash: event.extrinsic?.hash,
                    result: decoded.result
                })
            }
        }
    }
    return events
}

// Implement the logic to extract MultisigCancelled events
function getMultisigCancelledEvents(ctx: ProcessorContext<Store>): MultisigCancelledEvent[] {
    let events: MultisigCancelledEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == multisigCancelled.name) {
                const decoded = multisigCancelled.coretimeRococoV9430.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    cancelling: ss58.codec(getChainConfig().prefix).encode(decoded.cancelling),
                    timepoint: decoded.timepoint,
                    multisig: ss58.codec(getChainConfig().prefix).encode(decoded.multisig),
                    callHash: event.extrinsic?.hash
                })
            }
        }
    }
    return events
}

interface EntityMap {
    [key: string]: any;
}

export const multisigEventFetchers: EntityMap = {
    newMultisig: getNewMultisigEvents,
    multisigApproval: getMultisigApprovalEvents,
    multisigExecuted: getMultisigExecutedEvents,
    multisigCancelled: getMultisigCancelledEvents,
};