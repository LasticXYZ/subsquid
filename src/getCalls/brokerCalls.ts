import { Store } from "@subsquid/typeorm-store";
import { ProcessorContext } from "../processor";
import * as ss58 from '@subsquid/ss58'
import assert from 'assert'
import { 
    ConfigureCall,
    ReserveCall,
    UnreserveCall,
    SetLeaseCall,
    StartSalesCall,
    PurchaseCall,
    RenewCall,
    TransferCall,
    PartitionCall,
    InterlaceCall,
    AssignCall,
    PoolCall,
    ClaimRevenueCall,
    PurchaseCreditCall,
    DropRegionCall,
    DropContributionCall,
    DropHistoryCall,
    DropRenewalCall,
    RequestCoreCountCall
} from "../interfaces";
import { 
    configure,
    reserve,
    unreserve,
    setLease,
    startSales,
    purchase,
    renew,
    transfer,
    partition,
    interlace,
    assign,
    pool,
    claimRevenue,
    purchaseCredit,
    dropRegion,
    dropContribution,
    dropHistory,
    dropRenewal,
    requestCoreCount
} from "../types/broker/calls";

function getConfigureCalls(ctx: ProcessorContext<Store>) {
    let calls: ConfigureCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === configure.name) {
                const decoded = configure.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);

                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    config: decoded.config,
                });
            }
        }
    }
    return calls;
}

function getReserveCalls(ctx: ProcessorContext<Store>) {
    let calls: ReserveCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === reserve.name) {
                const decoded = reserve.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);

                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    workload: decoded.workload,
                });
            }
        }
    }
    return calls;
}

function getUnreserveCalls(ctx: ProcessorContext<Store>) {
    let calls: UnreserveCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === unreserve.name) {
                const decoded = unreserve.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);

                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    itemIndex: decoded.itemIndex,
                });
            }
        }
    }
    return calls;
}

function getSetLeaseCalls(ctx: ProcessorContext<Store>) {
    let calls: SetLeaseCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === setLease.name) {
                const decoded = setLease.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);

                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    task: decoded.task,
                    until: decoded.until,
                });
            }
        }
    }
    return calls;
}

function getStartSalesCalls(ctx: ProcessorContext<Store>) {
    let calls: StartSalesCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === startSales.name) {
                const decoded = startSales.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);

                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    initialPrice: decoded.initialPrice,
                    coreCount: decoded.coreCount,
                });
            }
        }
    }
    return calls;
}

function getPurchaseCalls(ctx: ProcessorContext<Store>) {
    let calls: PurchaseCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === purchase.name) {
                const decoded = purchase.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);

                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    priceLimit: decoded.priceLimit,
                });
            }
        }
    }
    return calls;
}

function getRenewCalls(ctx: ProcessorContext<Store>) {
    let calls: RenewCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === renew.name) {
                const decoded = renew.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);

                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    core: decoded.core,
                });
            }
        }
    }
    return calls;
}

function getTransferCalls(ctx: ProcessorContext<Store>) {
    let calls: TransferCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === transfer.name) {
                const decoded = transfer.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);

                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    regionId: decoded.regionId,
                    newOwner: ss58.codec('kusama').encode(decoded.newOwner),
                });
            }
        }
    }
    return calls;
}

function getPartitionCalls(ctx: ProcessorContext<Store>) {
    let calls: PartitionCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === partition.name) {
                const decoded = partition.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash, 
                    regionId: decoded.regionId,
                    pivot: decoded.pivot,
                });
            }
        }
    }
    return calls;
}

function getInterlaceCalls(ctx: ProcessorContext<Store>) {
    let calls: InterlaceCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === interlace.name) {
                const decoded = interlace.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash, 
                    regionId: decoded.regionId,
                    pivot: decoded.pivot,
                });
            }
        }
    }
    return calls;
}

function getAssignCalls(ctx: ProcessorContext<Store>) {
    let calls: AssignCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === assign.name) {
                const decoded = assign.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash, 
                    regionId: decoded.regionId,
                    task: decoded.task,
                    finality: decoded.finality,
                });
            }
        }
    }
    return calls;
}

function getPoolCalls(ctx: ProcessorContext<Store>) {
    let calls: PoolCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === pool.name) {
                const decoded = pool.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash, 
                    regionId: decoded.regionId,
                    payee: decoded.payee,
                    finality: decoded.finality,
                });
            }
        }
    }
    return calls;
}


function getClaimRevenueCalls(ctx: ProcessorContext<Store>) {
    let calls: ClaimRevenueCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === claimRevenue.name) {
                const decoded = claimRevenue.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    regionId: decoded.regionId,
                    maxTimeslices: decoded.maxTimeslices,
                });
            }
        }
    }
    return calls;
}

function getPurchaseCreditCalls(ctx: ProcessorContext<Store>) {
    let calls: PurchaseCreditCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === purchaseCredit.name) {
                const decoded = purchaseCredit.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    amount: decoded.amount,
                    beneficiary: ss58.codec('kusama').encode(decoded.beneficiary),
                });
            }
        }
    }
    return calls;
}

function getDropRegionCalls(ctx: ProcessorContext<Store>) {
    let calls: DropRegionCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === dropRegion.name) {
                const decoded = dropRegion.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    regionId: decoded.regionId,
                });
            }
        }
    }
    return calls;
}

function getDropContributionCalls(ctx: ProcessorContext<Store>) {
    let calls: DropContributionCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === dropContribution.name) {
                const decoded = dropContribution.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    regionId: decoded.regionId,
                });
            }
        }
    }
    return calls;
}

function getDropHistoryCalls(ctx: ProcessorContext<Store>) {
    let calls: DropHistoryCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === dropHistory.name) {
                const decoded = dropHistory.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    when: decoded.when,
                });
            }
        }
    }
    return calls;
}

function getDropRenewalCalls(ctx: ProcessorContext<Store>) {
    let calls: DropRenewalCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === dropRenewal.name) {
                const decoded = dropRenewal.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    extrinsicHash: call.extrinsic?.hash,
                    core: decoded.core,
                    when: decoded.when,
                });
            }
        }
    }
    return calls;
}

function getRequestCoreCountCalls(ctx: ProcessorContext<Store>) {
    let calls: RequestCoreCountCall[] = [];
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            if (call.name === requestCoreCount.name) {
                const decoded = requestCoreCount.v9430.decode(call);
                assert(block.header.timestamp, `Undefined timestamp at block ${block.header.height}`);
                
                calls.push({
                    id: call.id,
                    blockNumber: block.header.height,
                    timestamp: new Date(block.header.timestamp), 
                    coreCount: decoded.coreCount,
                });
            }
        }
    }
    return calls;
}

export {
    getConfigureCalls,
    getReserveCalls,
    getUnreserveCalls,
    getSetLeaseCalls,
    getStartSalesCalls,
    getPurchaseCalls,
    getRenewCalls,
    getTransferCalls,
    getPartitionCalls,
    getInterlaceCalls,
    getAssignCalls,
    getPoolCalls,
    getClaimRevenueCalls,
    getPurchaseCreditCalls,
    getDropRegionCalls,
    getDropContributionCalls,
    getDropHistoryCalls,
    getDropRenewalCalls,
    getRequestCoreCountCalls,
}