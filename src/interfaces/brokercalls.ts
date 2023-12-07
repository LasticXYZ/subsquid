import { ConfigRecord, ScheduleItem, RegionId, AccountId32, CoreMask, Finality } from "../types/v268";

interface ConfigureCall {
    config: ConfigRecord;
}

interface ReserveCall {
    workload: ScheduleItem[];
}

interface UnreserveCall {
    itemIndex: number;
}

interface SetLeaseCall {
    task: number;
    until: number;
}

interface StartSalesCall {
    initialPrice: bigint;
    coreCount: number;
}

interface PurchaseCall {
    priceLimit: bigint;
}

interface RenewCall {
    core: number;
}

interface TransferCall {
    regionId: RegionId;
    newOwner: typeof AccountId32;
}

interface PartitionCall {
    regionId: RegionId;
    pivot: number;
}

interface InterlaceCall {
    regionId: RegionId;
    pivot: CoreMask;
}

interface AssignCall {
    regionId: RegionId;
    task: number;
    finality: Finality;
}

interface PoolCall {
    regionId: RegionId;
    payee: typeof AccountId32;
    finality: Finality;
}

interface ClaimRevenueCall {
    regionId: RegionId;
    maxTimeslices: number;
}

interface PurchaseCreditCall {
    amount: bigint;
    beneficiary: typeof AccountId32;
}

interface DropRegionCall {
    regionId: RegionId;
}

interface DropContributionCall {
    regionId: RegionId;
}

interface DropHistoryCall {
    when: number;
}

interface DropRenewalCall {
    core: number;
    when: number;
}

interface RequestCoreCountCall {
    coreCount: number;
}

// Export all interfaces
export {
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
}
