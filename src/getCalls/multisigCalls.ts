import { Store } from "@subsquid/typeorm-store";
import { ProcessorContext } from "../processor";
import * as ss58 from '@subsquid/ss58'
import assert from 'assert'
import { 
    AsMultiCall,
    ApproveAsMultiCall
} from "../interfaces";
import { 
    asMulti,
    approveAsMulti,
} from "../types/multisig/calls";
import { getChainConfig } from "../const";

function getAsMultiCalls(ctx: ProcessorContext<Store>) {
    let calls: AsMultiCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === asMulti.name) {
                const decoded = asMulti.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);

                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    otherSignatories: decoded.otherSignatories,
                    maybeTimepoint: decoded.maybeTimepoint,
                    callHash: decoded.call.toString(),
                    maxWeight: decoded.maxWeight
                });
            }
        }
    }
    return calls;
}

function getApproveAsMultiCalls(ctx: ProcessorContext<Store>) {
    let calls: ApproveAsMultiCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === approveAsMulti.name) {
                const decoded = approveAsMulti.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);

                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    threshold: decoded.threshold,
                    otherSignatories: decoded.otherSignatories,
                    maybeTimepoint: decoded.maybeTimepoint,
                    callHash: decoded.callHash,
                    maxWeight: decoded.maxWeight
                });
            }
        }
    }
    return calls;
}

export {
    getAsMultiCalls
}