import {
    newMultisig as newMultisigROC,
    multisigApproval as multisigApprovalROC,
    multisigExecuted as multisigExecutedROC,
    multisigCancelled as multisigCancelledROC
} from '../types/rococo/multisig/events';
import {
    newMultisig as newMultisigKSM,
    multisigApproval as multisigApprovalKSM,
    multisigExecuted as multisigExecutedKSM,
    multisigCancelled as multisigCancelledKSM
} from '../types/kusama/multisig/events';
import {
    historyInitialized as historyInitializedROC,
    saleInitialized as saleInitializedROC,
    salesStarted as salesStartedROC,
    purchased as purchasedROC,
    renewable as renewableROC,
    renewed as renewedROC,
    transferred as transferredROC,
    partitioned as partitionedROC,
    interlaced as interlacedROC,
    assigned as assignedROC,
    pooled as pooledROC,
    coreCountRequested as coreCountRequestedROC,
    coreCountChanged as coreCountChangedROC,
    reservationMade as reservationMadeROC,
    reservationCancelled as reservationCancelledROC,
    leased as leasedROC,
    leaseEnding as leaseEndingROC,
    revenueClaimBegun as revenueClaimBegunROC,
    revenueClaimItem as revenueClaimItemROC,
    revenueClaimPaid as revenueClaimPaidROC,
    creditPurchased as creditPurchasedROC,
    regionDropped as regionDroppedROC,
    contributionDropped as contributionDroppedROC,
    historyDropped as historyDroppedROC,
    historyIgnored as historyIgnoredROC,
    claimsReady as claimsReadyROC,
    coreAssigned as coreAssignedROC,
    allowedRenewalDropped as allowedRenewalDroppedROC
} from '../types/rococo/broker/events'

import {
    historyInitialized as historyInitializedKSM,
    saleInitialized as saleInitializedKSM,
    salesStarted as salesStartedKSM,
    purchased as purchasedKSM,
    renewable as renewableKSM,
    renewed as renewedKSM,
    transferred as transferredKSM,
    partitioned as partitionedKSM,
    interlaced as interlacedKSM,
    assigned as assignedKSM,
    pooled as pooledKSM,
    coreCountRequested as coreCountRequestedKSM,
    coreCountChanged as coreCountChangedKSM,
    reservationMade as reservationMadeKSM,
    reservationCancelled as reservationCancelledKSM,
    leased as leasedKSM,
    leaseEnding as leaseEndingKSM,
    revenueClaimBegun as revenueClaimBegunKSM,
    revenueClaimItem as revenueClaimItemKSM,
    revenueClaimPaid as revenueClaimPaidKSM,
    creditPurchased as creditPurchasedKSM,
    regionDropped as regionDroppedKSM,
    contributionDropped as contributionDroppedKSM,
    historyDropped as historyDroppedKSM,
    historyIgnored as historyIgnoredKSM,
    claimsReady as claimsReadyKSM,
    coreAssigned as coreAssignedKSM,
    allowedRenewalDropped as allowedRenewalDroppedKSM
} from '../types/kusama/broker/events'

const chainIdx = process.env.IDX_CHAIN as 'rococo' | 'kusama';

// Multisig events
let newMultisig: typeof newMultisigROC | typeof newMultisigKSM;
let multisigApproval: typeof multisigApprovalROC | typeof multisigApprovalKSM;
let multisigExecuted: typeof multisigExecutedROC | typeof multisigExecutedKSM;
let multisigCancelled: typeof multisigCancelledROC | typeof multisigCancelledKSM;

// Broker events
let historyInitialized: typeof historyInitializedROC | typeof historyInitializedKSM;
let saleInitialized: typeof saleInitializedROC | typeof saleInitializedKSM;
let salesStarted: typeof salesStartedROC | typeof salesStartedKSM;
let purchased: typeof purchasedROC | typeof purchasedKSM;
let renewable: typeof renewableROC | typeof renewableKSM;
let renewed: typeof renewedROC | typeof renewedKSM;
let transferred: typeof transferredROC | typeof transferredKSM;
let partitioned: typeof partitionedROC | typeof partitionedKSM;
let interlaced: typeof interlacedROC | typeof interlacedKSM;
let assigned: typeof assignedROC | typeof assignedKSM;
let pooled: typeof pooledROC | typeof pooledKSM;
let coreCountRequested: typeof coreCountRequestedROC | typeof coreCountRequestedKSM;
let coreCountChanged: typeof coreCountChangedROC | typeof coreCountChangedKSM;
let reservationMade: typeof reservationMadeROC | typeof reservationMadeKSM;
let reservationCancelled: typeof reservationCancelledROC | typeof reservationCancelledKSM;
let leased: typeof leasedROC | typeof leasedKSM;
let leaseEnding: typeof leaseEndingROC | typeof leaseEndingKSM;
let revenueClaimBegun: typeof revenueClaimBegunROC | typeof revenueClaimBegunKSM;
let revenueClaimItem: typeof revenueClaimItemROC | typeof revenueClaimItemKSM;
let revenueClaimPaid: typeof revenueClaimPaidROC | typeof revenueClaimPaidKSM;
let creditPurchased: typeof creditPurchasedROC | typeof creditPurchasedKSM;
let regionDropped: typeof regionDroppedROC | typeof regionDroppedKSM;
let contributionDropped: typeof contributionDroppedROC | typeof contributionDroppedKSM;
let historyDropped: typeof historyDroppedROC | typeof historyDroppedKSM;
let historyIgnored: typeof historyIgnoredROC | typeof historyIgnoredKSM;
let claimsReady: typeof claimsReadyROC | typeof claimsReadyKSM;
let coreAssigned: typeof coreAssignedROC | typeof coreAssignedKSM;
let allowedRenewalDropped: typeof allowedRenewalDroppedROC | typeof allowedRenewalDroppedKSM;

if (chainIdx === 'rococo') {
    // Multisig events
    newMultisig = newMultisigROC;
    multisigApproval = multisigApprovalROC;
    multisigExecuted = multisigExecutedROC;
    multisigCancelled = multisigCancelledROC;
    // Broker events
    historyInitialized = historyInitializedROC;
    saleInitialized = saleInitializedROC;
    salesStarted = salesStartedROC;
    purchased = purchasedROC;
    renewable = renewableROC;
    renewed = renewedROC;
    transferred = transferredROC;
    partitioned = partitionedROC;
    interlaced = interlacedROC;
    assigned = assignedROC;
    pooled = pooledROC;
    coreCountRequested = coreCountRequestedROC;
    coreCountChanged = coreCountChangedROC;
    reservationMade = reservationMadeROC;
    reservationCancelled = reservationCancelledROC;
    leased = leasedROC;
    leaseEnding = leaseEndingROC;
    revenueClaimBegun = revenueClaimBegunROC;
    revenueClaimItem = revenueClaimItemROC;
    revenueClaimPaid = revenueClaimPaidROC;
    creditPurchased = creditPurchasedROC;
    regionDropped = regionDroppedROC;
    contributionDropped = contributionDroppedROC;
    historyDropped = historyDroppedROC;
    historyIgnored = historyIgnoredROC;
    claimsReady = claimsReadyROC;
    coreAssigned = coreAssignedROC;
    allowedRenewalDropped = allowedRenewalDroppedROC;
} else {
    // Multisig events
    newMultisig = newMultisigKSM;
    multisigApproval = multisigApprovalKSM;
    multisigExecuted = multisigExecutedKSM;
    multisigCancelled = multisigCancelledKSM;

    // Broker events
    historyInitialized = historyInitializedKSM;
    saleInitialized = saleInitializedKSM;
    salesStarted = salesStartedKSM;
    purchased = purchasedKSM;
    renewable = renewableKSM;
    renewed = renewedKSM;
    transferred = transferredKSM;
    partitioned = partitionedKSM;
    interlaced = interlacedKSM;
    assigned = assignedKSM;
    pooled = pooledKSM;
    coreCountRequested = coreCountRequestedKSM;
    coreCountChanged = coreCountChangedKSM;
    reservationMade = reservationMadeKSM;
    reservationCancelled = reservationCancelledKSM;
    leased = leasedKSM;
    leaseEnding = leaseEndingKSM;
    revenueClaimBegun = revenueClaimBegunKSM;
    revenueClaimItem = revenueClaimItemKSM;
    revenueClaimPaid = revenueClaimPaidKSM;
    creditPurchased = creditPurchasedKSM;
    regionDropped = regionDroppedKSM;
    contributionDropped = contributionDroppedKSM;
    historyDropped = historyDroppedKSM;
    historyIgnored = historyIgnoredKSM;
    claimsReady = claimsReadyKSM;
    coreAssigned = coreAssignedKSM;
    allowedRenewalDropped = allowedRenewalDroppedKSM;
}

export { 
    newMultisig, 
    multisigApproval, 
    multisigExecuted, 
    multisigCancelled,
    historyInitialized,
    saleInitialized,
    salesStarted,
    purchased,
    renewable,
    renewed,
    transferred,
    partitioned,
    interlaced,
    assigned,
    pooled,
    coreCountRequested,
    coreCountChanged,
    reservationMade,
    reservationCancelled,
    leased,
    leaseEnding,
    revenueClaimBegun,
    revenueClaimItem,
    revenueClaimPaid,
    creditPurchased,
    regionDropped,  
    contributionDropped,
    historyDropped,
    historyIgnored,
    claimsReady,
    coreAssigned,
    allowedRenewalDropped
};


export {
  saleInitializedROC,
  saleInitializedKSM
}