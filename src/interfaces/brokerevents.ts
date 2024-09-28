
import { CoreAssignment, ScheduleItem, RegionId, AccountId32 } from "../types/kusama/v1002000"

// Common property interfaces
interface BaseEvent {
    id: string;
    blockNumber: number;
    timestamp: Date;
    extrinsicHash?: string;
}



interface TransferEventData {
    from: string;
    to: string;
    amount: bigint;
    fee?: bigint;
}

interface HistoryInitializedEventData {
    when: number;
    privatePoolSize: number;
    systemPoolSize: number;
}

// EventData-specific data interfaces without common properties
interface SaleInitializedEventData {
    saleStart: number;
    leadinLength: number;
    startPrice: bigint;
    regularPrice: bigint;
    regionBegin: number;
    regionEnd: number;
    idealCoresSold: number;
    coresOffered: number;
}

interface SaleInitializedEventData {
    saleStart: number;
    leadinLength: number;
    startPrice: bigint;
    regularPrice: bigint;
    regionBegin: number;
    regionEnd: number;
    idealCoresSold: number;
    coresOffered: number;
}

interface SalesStartedEventData {
    price: bigint;
    coreCount: number;
}

interface PurchasedEventData {
    who: string;
    regionId: RegionId;
    price: bigint;
    duration: number;
}

interface CoreOwnerEventData {
    owner: string;
    regionId: RegionId;
    price?: bigint | null;
    duration: number;
    pooled: boolean;
    assigned: boolean;
    task: number | null;
}

interface RenewableEventData {
    core: number;
    price: bigint;
    begin: number;
    workload: ScheduleItem[];
}

interface RenewedEventData {
    who: string;
    price: bigint;
    oldCore: number;
    core: number;
    begin: number;
    duration: number;
    workload: ScheduleItem[];
}

interface TransferredEventData {
    regionId: RegionId;
    duration: number;
    oldOwner?: string;
    owner?: string;
}

interface PartitionedEventData {
    oldRegionId: RegionId;
    newRegionIds: [RegionId, RegionId];
}

interface InterlacedEventData {
    oldRegionId: RegionId;
    newRegionIds: [RegionId, RegionId];
}

interface AssignedEventData {
    regionId: RegionId;
    duration: number;
    task: number;
}

interface PooledEventData {
    regionId: RegionId;
    duration: number;
}

interface CoreCountRequestedEventData {
    coreCount: number;
}

interface CoreCountChangedEventData {
    coreCount: number;
}

interface ReservationMadeEventData {
    index: number;
    workload: ScheduleItem[];
}

interface ReservationCancelledEventData {
    index: number;
    workload: ScheduleItem[];
}

interface LeasedEventData {
    task: number;
    until: number;
}

interface LeaseEndingEventData {
    task: number;
    when: number;
}

interface RevenueClaimBegunEventData {
    region: RegionId;
    maxTimeslices: number;
}

interface RevenueClaimItemEventData {
    when: number;
    amount: bigint;
}

interface RevenueClaimPaidEventData {
    who: string;
    amount: bigint;
    next: RegionId | null;
}

interface CreditPurchasedEventData {
    who: string;
    beneficiary: string;
    amount: bigint;
}

interface RegionDroppedEventData {
    regionId: RegionId;
    duration: number;
}

interface ContributionDroppedEventData {
    regionId: RegionId;
}

interface HistoryDroppedEventData {
    when: number;
    revenue: bigint;
}

interface HistoryIgnoredEventData {
    when: number;
    revenue: bigint;
}

interface ClaimsReadyEventData {
    when: number;
    systemPayout: bigint;
    privatePayout: bigint;
}

interface CoreAssignedEventData {
    core: number;
    when: number;
    assignment: [CoreAssignment, number][];
}

interface AllowedRenewalDroppedEventData {
    when: number;
    core: number;
}

// Event-specific interfaces with common properties
interface TransferEvent extends BaseEvent, TransferEventData {}
interface HistoryInitializedEvent extends BaseEvent, HistoryInitializedEventData {}
interface SaleInitializedEvent extends BaseEvent, SaleInitializedEventData {}
interface SalesStartedEvent extends BaseEvent, SalesStartedEventData {}
interface PurchasedEvent extends BaseEvent, PurchasedEventData {}
interface CoreOwnerEvent extends BaseEvent, CoreOwnerEventData {}
interface RenewableEvent extends BaseEvent, RenewableEventData {}
interface RenewedEvent extends BaseEvent, RenewedEventData {}
interface TransferredEvent extends BaseEvent, TransferredEventData {}
interface PartitionedEvent extends BaseEvent, PartitionedEventData {}
interface InterlacedEvent extends BaseEvent, InterlacedEventData {}
interface AssignedEvent extends BaseEvent, AssignedEventData {}
interface PooledEvent extends BaseEvent, PooledEventData {}
interface CoreCountRequestedEvent extends BaseEvent, CoreCountRequestedEventData {}
interface CoreCountChangedEvent extends BaseEvent, CoreCountChangedEventData {}
interface ReservationMadeEvent extends BaseEvent, ReservationMadeEventData {}
interface ReservationCancelledEvent extends BaseEvent, ReservationCancelledEventData {}
interface LeasedEvent extends BaseEvent, LeasedEventData {}
interface LeaseEndingEvent extends BaseEvent, LeaseEndingEventData {}
interface RevenueClaimBegunEvent extends BaseEvent, RevenueClaimBegunEventData {}
interface RevenueClaimItemEvent extends BaseEvent, RevenueClaimItemEventData {}
interface RevenueClaimPaidEvent extends BaseEvent, RevenueClaimPaidEventData {}
interface CreditPurchasedEvent extends BaseEvent, CreditPurchasedEventData {}
interface RegionDroppedEvent extends BaseEvent, RegionDroppedEventData {}
interface ContributionDroppedEvent extends BaseEvent, ContributionDroppedEventData {}
interface HistoryDroppedEvent extends BaseEvent, HistoryDroppedEventData {}
interface HistoryIgnoredEvent extends BaseEvent, HistoryIgnoredEventData {}
interface ClaimsReadyEvent extends BaseEvent, ClaimsReadyEventData {}
interface CoreAssignedEvent extends BaseEvent, CoreAssignedEventData {}
interface AllowedRenewalDroppedEvent extends BaseEvent, AllowedRenewalDroppedEventData {}


// Export all interfaces
export {
    TransferEventData,
    HistoryInitializedEventData,
    SaleInitializedEventData,
    SalesStartedEventData,
    PurchasedEventData,
    CoreOwnerEventData,
    RenewableEventData,
    RenewedEventData,
    TransferredEventData,
    PartitionedEventData,
    InterlacedEventData,
    AssignedEventData,
    PooledEventData,
    CoreCountRequestedEventData,
    CoreCountChangedEventData,
    ReservationMadeEventData,
    ReservationCancelledEventData,
    LeasedEventData,
    LeaseEndingEventData,
    RevenueClaimBegunEventData,
    RevenueClaimItemEventData,
    RevenueClaimPaidEventData,
    CreditPurchasedEventData,
    RegionDroppedEventData,
    ContributionDroppedEventData,
    HistoryDroppedEventData,
    HistoryIgnoredEventData,
    ClaimsReadyEventData,
    CoreAssignedEventData,
    AllowedRenewalDroppedEventData
}

export {
    TransferEvent,
    HistoryInitializedEvent,
    SaleInitializedEvent,
    SalesStartedEvent,
    PurchasedEvent,
    CoreOwnerEvent,
    RenewableEvent,
    RenewedEvent,
    TransferredEvent,
    PartitionedEvent,
    InterlacedEvent,
    AssignedEvent,
    PooledEvent,
    CoreCountRequestedEvent,
    CoreCountChangedEvent,
    ReservationMadeEvent,
    ReservationCancelledEvent,
    LeasedEvent,
    LeaseEndingEvent,
    RevenueClaimBegunEvent,
    RevenueClaimItemEvent,
    RevenueClaimPaidEvent,
    CreditPurchasedEvent,
    RegionDroppedEvent,
    ContributionDroppedEvent,
    HistoryDroppedEvent,
    HistoryIgnoredEvent,
    ClaimsReadyEvent,
    CoreAssignedEvent,
    AllowedRenewalDroppedEvent
}

