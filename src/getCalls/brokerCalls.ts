import { Store } from "@subsquid/typeorm-store";
import { ProcessorContext } from "../processor";
import { PurchaseCall } from "../interfaces";
import { purchase } from "../types/broker/calls";

function getPurchaseCalls(ctx: ProcessorContext<Store>) {
    let calls: PurchaseCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === purchase.name) {
                // process the call
            }
        }
    }
}


export {
    getPurchaseCalls
}