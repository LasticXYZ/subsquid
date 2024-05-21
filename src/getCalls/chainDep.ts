import { 
    configure as configureROC,
    reserve as reserveROC,
    unreserve as unreserveROC,
    setLease as setLeaseROC,
    startSales as startSalesROC,
    purchase as purchaseROC,
    renew as renewROC,
    transfer as transferROC,
    partition as partitionROC,
    interlace as interlaceROC,
    assign as assignROC,
    pool as poolROC,
    claimRevenue as claimRevenueROC,
    purchaseCredit as purchaseCreditROC,
    dropRegion as dropRegionROC,
    dropContribution as dropContributionROC,
    dropHistory as dropHistoryROC,
    dropRenewal as dropRenewalROC,
    requestCoreCount as requestCoreCountROC
} from "../types/rococo/broker/calls";

import { 
    configure as configureKSM,
    reserve as reserveKSM,
    unreserve as unreserveKSM,
    setLease as setLeaseKSM,
    startSales as startSalesKSM,
    purchase as purchaseKSM,
    renew as renewKSM,
    transfer as transferKSM,
    partition as partitionKSM,
    interlace as interlaceKSM,
    assign as assignKSM,
    pool as poolKSM,
    claimRevenue as claimRevenueKSM,
    purchaseCredit as purchaseCreditKSM,
    dropRegion as dropRegionKSM,
    dropContribution as dropContributionKSM,
    dropHistory as dropHistoryKSM,
    dropRenewal as dropRenewalKSM,
    requestCoreCount as requestCoreCountKSM
} from "../types/kusama/broker/calls";

const chainIdx = process.env.IDX_CHAIN as 'rococo' | 'kusama';

// Broker calls
let configure: typeof configureROC | typeof configureKSM;
let reserve: typeof reserveROC | typeof reserveKSM;
let unreserve: typeof unreserveROC | typeof unreserveKSM;
let setLease: typeof setLeaseROC | typeof setLeaseKSM;
let startSales: typeof startSalesROC | typeof startSalesKSM;
let purchase: typeof purchaseROC | typeof purchaseKSM;
let renew: typeof renewROC | typeof renewKSM;
let transfer: typeof transferROC | typeof transferKSM;
let partition: typeof partitionROC | typeof partitionKSM;
let interlace: typeof interlaceROC | typeof interlaceKSM;
let assign: typeof assignROC | typeof assignKSM;
let pool: typeof poolROC | typeof poolKSM;
let claimRevenue: typeof claimRevenueROC | typeof claimRevenueKSM;
let purchaseCredit: typeof purchaseCreditROC | typeof purchaseCreditKSM;
let dropRegion: typeof dropRegionROC | typeof dropRegionKSM;
let dropContribution: typeof dropContributionROC | typeof dropContributionKSM;
let dropHistory: typeof dropHistoryROC | typeof dropHistoryKSM;
let dropRenewal: typeof dropRenewalROC | typeof dropRenewalKSM;
let requestCoreCount: typeof requestCoreCountROC | typeof requestCoreCountKSM;

if (chainIdx == 'rococo') {
    configure = configureROC;
    reserve = reserveROC;
    unreserve = unreserveROC;
    setLease = setLeaseROC;
    startSales = startSalesROC;
    purchase = purchaseROC;
    renew = renewROC;
    transfer = transferROC;
    partition = partitionROC;
    interlace = interlaceROC;
    assign = assignROC;
    pool = poolROC;
    claimRevenue = claimRevenueROC;
    purchaseCredit = purchaseCreditROC;
    dropRegion = dropRegionROC;
    dropContribution = dropContributionROC;
    dropHistory = dropHistoryROC;
    dropRenewal = dropRenewalROC;
    requestCoreCount = requestCoreCountROC;
} else {
    configure = configureKSM;
    reserve = reserveKSM;
    unreserve = unreserveKSM;
    setLease = setLeaseKSM;
    startSales = startSalesKSM;
    purchase = purchaseKSM;
    renew = renewKSM;
    transfer = transferKSM;
    partition = partitionKSM;
    interlace = interlaceKSM;
    assign = assignKSM;
    pool = poolKSM;
    claimRevenue = claimRevenueKSM;
    purchaseCredit = purchaseCreditKSM;
    dropRegion = dropRegionKSM;
    dropContribution = dropContributionKSM;
    dropHistory = dropHistoryKSM;
    dropRenewal = dropRenewalKSM;
    requestCoreCount = requestCoreCountKSM;
}

export {
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
}