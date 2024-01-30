import {processor, ProcessorContext} from '../processor'
import {
    ConfigureExt,
    ReserveExt,
    UnreserveExt,
    SetLeaseExt,
    StartSalesExt,
    PurchaseExt,
    RenewExt,
    TransferExt,
    PartitionExt,
    InterlaceExt,
    AssignExt,
    PoolExt,
    ClaimRevenueExt, 
    PurchaseCreditExt,
    DropRegionExt,
    DropContributionExt,
    DropHistoryExt,
    DropRenewalExt,
    RequestCoreCountExt
} from '../model'
import {In} from 'typeorm'
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
} from '../interfaces'

import {Store} from '@subsquid/typeorm-store'
import {
    convertRegionId, 
    convertRegionIds, 
    transformScheduleItem, 
    transformCoreAssignments
} from './helper'

function createConfigureCallEntities(calls: ConfigureCall[]): ConfigureExt[] {
    return calls.map(call => new ConfigureExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        config: call.config,
    }));
}

function createReserveCallEntities(calls: ReserveCall[]): ReserveExt[] {
    return calls.map(call => new ReserveExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        workload: call.workload.map(transformScheduleItem),
    }));
}

function createUnreserveCallEntities(calls: UnreserveCall[]): UnreserveExt[] {
    return calls.map(call => new UnreserveExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        itemIndex: call.itemIndex,
    }));
}

function createSetLeaseCallEntities(calls: SetLeaseCall[]): SetLeaseExt[] {
    return calls.map(call => new SetLeaseExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        regionId: convertRegionId(call.regionId),
        duration: call.duration,
    }));
}

function createStartSalesCallEntities(calls: StartSalesCall[]): StartSalesExt[] {
    return calls.map(call => new StartSalesExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        price: call.price,
        coreCount: call.coreCount,
    }));
}

function createPurchaseCreditCallEntities(calls: PurchaseCreditCall[]): PurchaseCreditExt[] {
    return calls.map(call => new PurchaseCreditExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
    }));
}

function createRenewCallEntities(calls: RenewCall[]): RenewExt[] {
    return calls.map(call => new RenewExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        core: call.core,
    }));
}

function createTransferCallEntities(calls: TransferCall[]): TransferExt[] {
    return calls.map(call => new TransferExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        regionId: convertRegionId(call.regionId),
        newOwner: call.newOwner,
    }));
}

function createPartitionCallEntities(calls: PartitionCall[]): PartitionExt[] {
    return calls.map(call => new PartitionExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        regionId: convertRegionId(call.regionId),
        pivot: call.pivot,
    }));
}

function createInterlaceCallEntities(calls: InterlaceCall[]): InterlaceExt[] {
    return calls.map(call => new InterlaceExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        regionId: convertRegionId(call.regionId),
    }));
}

function createAssignCallEntities(calls: AssignCall[]): AssignExt[] {
    return calls.map(call => new AssignExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        regionId: convertRegionId(call.regionId),
        assignments: transformCoreAssignments(call.assignments),
    }));
}

function createPoolCallEntities(calls: PoolCall[]): PoolExt[] {
    return calls.map(call => new PoolExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        core: call.core,
    }));
}

function createClaimRevenueCallEntities(calls: ClaimRevenueCall[]): ClaimRevenueExt[] {
    return calls.map(call => new ClaimRevenueExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        regionId: convertRegionId(call.regionId),
    }));
}

function createDropRegionCallEntities(calls: DropRegionCall[]): DropRegionExt[] {
    return calls.map(call => new DropRegionExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        regionId: convertRegionId(call.regionId),
    }));
}

function createDropContributionCallEntities(calls: DropContributionCall[]): DropContributionExt[] {
    return calls.map(call => new DropContributionExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        regionId: convertRegionId(call.regionId),
    }));
}

function createDropHistoryCallEntities(calls: DropHistoryCall[]): DropHistoryExt[] {
    return calls.map(call => new DropHistoryExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
    }));
}

function createDropRenewalCallEntities(calls: DropRenewalCall[]): DropRenewalExt[] {
    return calls.map(call => new DropRenewalExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
    }));
}

function createRequestCoreCountCallEntities(calls: RequestCoreCountCall[]): RequestCoreCountExt[] {
    return calls.map(call => new RequestCoreCountExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        coreCount: call.coreCount,
    }));
}

function createPurchaseCallEntities(calls: PurchaseCall[]): PurchaseExt[] {
    return calls.map(call => new PurchaseExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        priceLimit: call.priceLimit
    }));
}

export {
    createConfigureCallEntities,
    createReserveCallEntities,
    createPurchaseCallEntities,
    createUnreserveCallEntities,
    createSetLeaseCallEntities,
    createStartSalesCallEntities,
    createPurchaseCreditCallEntities,
    createRenewCallEntities,
    createTransferCallEntities,
    createPartitionCallEntities,
    createInterlaceCallEntities,
    createAssignCallEntities,
    createPoolCallEntities,
    createClaimRevenueCallEntities,
    createDropRegionCallEntities,
    createDropContributionCallEntities,
    createDropHistoryCallEntities,
    createDropRenewalCallEntities,
    createRequestCoreCountCallEntities
}
