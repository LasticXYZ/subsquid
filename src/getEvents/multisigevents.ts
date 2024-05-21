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
} from './chainDep'

import {Store} from '@subsquid/typeorm-store'
import { decodeEvent } from './helper'

const chainIdx = process.env.IDX_CHAIN as 'rococo' | 'kusama';


// Implement the logic to extract NewMultisigEvents events
function getNewMultisigEvents(ctx: ProcessorContext<Store>): NewMultisigEvent[] {
    let events: NewMultisigEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == newMultisig.name) {
                const decoded = decodeEvent(event, newMultisig)
                //const decoded = newMultisig.v9430.decode(event) // adjust with actual decoder
                if (decoded) {
                    assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                    events.push({
                        id: event.id,
                        blockNumber: block.header.height,
                        timestamp: new Date(block.header.timestamp),
                        approving: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.approving),
                        multisig: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.multisig),
                        callHash: event.extrinsic?.hash
                    })
                }
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
                const decoded = decodeEvent(event, multisigApproval)
                //const decoded = multisigApproval.v9430.decode(event) // adjust with actual decoder
                if (decoded) {
                    assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                    events.push({
                        id: event.id,
                        blockNumber: block.header.height,
                        timestamp: new Date(block.header.timestamp),
                        approving: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.approving),
                        timepoint: decoded.timepoint,
                        callHash: event.extrinsic?.hash
                    })
                }
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
                const decoded = decodeEvent(event, multisigExecuted)
                //const decoded = multisigExecuted.v1002000.decode(event) // adjust with actual decoder
                
                if (decoded) {
                    assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                    events.push({
                        id: event.id,
                        blockNumber: block.header.height,
                        timestamp: new Date(block.header.timestamp),
                        approving: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.approving),
                        timepoint: decoded.timepoint,
                        multisig: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.multisig),
                        callHash: event.extrinsic?.hash,
                        result: decoded.result
                    })
                }
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
                const decoded = decodeEvent(event, multisigCancelled)
                //const decoded = multisigCancelled.v9430.decode(event) // adjust with actual decoder
                if (decoded) {
                    assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                    events.push({
                        id: event.id,
                        blockNumber: block.header.height,
                        timestamp: new Date(block.header.timestamp),
                        cancelling: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.cancelling),
                        timepoint: decoded.timepoint,
                        multisig: ss58.codec(process.env.PREFIX_CHAIN ? Number(process.env.PREFIX_CHAIN) : 42).encode(decoded.multisig),
                        callHash: event.extrinsic?.hash
                    })
                }
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