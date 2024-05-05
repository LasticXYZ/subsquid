//import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    SubstrateBatchProcessor,
    SubstrateBatchProcessorFields,
    Event as _Event,
    Call as _Call,
    Extrinsic as _Extrinsic
} from '@subsquid/substrate-processor'

import {events} from './types'

export const processor = new SubstrateBatchProcessor()
    // Lookup archive by the network name in Subsquid registry
    // See https://docs.subsquid.io/substrate-indexing/supported-networks/
    //.setGateway('https://v2.archive.subsquid.io/network/kusama')
    // Chain RPC endpoint is required on Substrate for metadata and real-time updates
    .setRpcEndpoint({
        // Set via .env for local runs or via secrets when deploying to Subsquid Cloud
        // https://docs.subsquid.io/deploy-squid/env-variables/
        url: process.env.RPC_ENDPOINT ? process.env.RPC_ENDPOINT : 'wss://rococo-coretime-rpc.polkadot.io',
        // More RPC connection options at https://docs.subsquid.io/substrate-indexing/setup/general/#set-data-source
        rateLimit: 300
    })
    .addEvent({
        name: [
            'Broker.HistoryInitialized',
            'Broker.SaleInitialized',
            'Broker.SalesStarted',
            'Broker.Purchased',
            'Broker.Renewable',
            'Broker.Renewed',
            'Broker.Transferred',
            'Broker.Partitioned',
            'Broker.Interlaced',
            'Broker.Assigned',
            'Broker.Pooled',
            'Broker.CoreCountRequested',
            'Broker.CoreCountChanged',
            'Broker.ReservationMade',
            'Broker.ReservationCancelled',
            'Broker.Leased',
            'Broker.LeaseEnding',
            'Broker.RevenueClaimBegun',
            'Broker.RevenueClaimItem',
            'Broker.RevenueClaimPaid',
            'Broker.CreditPurchased',
            'Broker.RegionDropped',
            'Broker.ContributionDropped',
            'Broker.HistoryDropped',
            'Broker.HistoryIgnored',
            'Broker.ClaimsReady',
            'Broker.CoreAssigned',
            'Broker.AllowedRenewalDropped',
            'Multisig.NewMultisig',
            'Multisig.MultisigApproval',
            'Multisig.MultisigExecuted',
            'Multisig.MultisigCancelled',
        ],
        call: true,
        extrinsic: true,
    })
    .setFields({
        event: {
            args: true
        },
        extrinsic: {
            hash: true,
            fee: true
        },
        block: {
            timestamp: true
        }
    })
    .setBlockRange({
        // genesis block happens to not have a timestamp, so it's easier
        // to start from 1 in cases when the deployment height is unknown
        // 268800 for Rococo
        // 22792000 for Kusama
        from: 1366400        // putting this here temporarily to speed up testing
    })
    // Uncomment to disable RPC ingestion and drastically reduce no of RPC calls
    //.useArchiveOnly()

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
