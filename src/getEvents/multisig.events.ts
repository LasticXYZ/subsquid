import { ProcessorContext } from '../processor'
import {
    newMultisigEvent,
    multisigApprovalEvent,
    multisigExecutedEvent,
    multisigCancelledEvent
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

// Implement the logic to extract NewMultisigEvents events
function getNewMultisigEvents(ctx: ProcessorContext<Store>): newMultisigEvent[] {
    let events: newMultisigEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == newMultisig.name) {
                const decoded = newMultisig.v9430.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    approving: ss58.codec('kusama').encode(decoded.approving),
                    multisig: ss58.codec('kusama').encode(decoded.multisig),
                    callHash: event.extrinsic?.hash
                })
            }
        }
    }
    return events
}

// Implement the logic to extract MultisigApproval events
function getMultisigApprovalEvents(ctx: ProcessorContext<Store>): multisigApprovalEvent[] {
    let events: multisigApprovalEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == multisigApproval.name) {
                const decoded = multisigApproval.v9430.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    approving: ss58.codec('kusama').encode(decoded.approving),
                    timepoint: decoded.timepoint,
                    callHash: event.extrinsic?.hash
                })
            }
        }
    }
    return events
}

// Implement the logic to extract MultisigExecuted events
function getMultisigExecutedEvents(ctx: ProcessorContext<Store>): multisigExecutedEvent[] {
    let events: multisigExecutedEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == multisigExecuted.name) {
                const decoded = multisigExecuted.v9430.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    approving: ss58.codec('kusama').encode(decoded.approving),
                    timepoint: decoded.timepoint,
                    multisig: ss58.codec('kusama').encode(decoded.multisig),
                    callHash: event.extrinsic?.hash,
                    result: decoded.result
                })
            }
        }
    }
    return events
}

// Implement the logic to extract MultisigCancelled events
function getMultisigCancelledEvents(ctx: ProcessorContext<Store>): multisigCancelledEvent[] {
    let events: multisigCancelledEvent[] = []
    for (let block of ctx.blocks) {
        for (let event of block.events) {
            if (event.name == multisigCancelled.name) {
                const decoded = multisigCancelled.v9430.decode(event) // adjust with actual decoder
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`)

                events.push({
                    id: event.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    regionId: decoded.regionId,
                    duration: decoded.duration
                })
            }
        }
    }
    return events
}



export { 
    getNewMultisigEvents,
    getMultisigApprovalEvents,
    getMultisigExecutedEvents,
    getMultisigCancelledEvents
}
