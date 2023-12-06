import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'

export const saleInitialized =  {
    name: 'Broker.SaleInitialized',
    /**
     * A new sale has been initialized.
     */
    v268: new EventType(
        'Broker.SaleInitialized',
        sts.struct({
            /**
             * The local block number at which the sale will/did start.
             */
            saleStart: sts.number(),
            /**
             * The length in blocks of the Leadin Period (where the price is decreasing).
             */
            leadinLength: sts.number(),
            /**
             * The price of Bulk Coretime at the beginning of the Leadin Period.
             */
            startPrice: sts.bigint(),
            /**
             * The price of Bulk Coretime after the Leadin Period.
             */
            regularPrice: sts.bigint(),
            /**
             * The first timeslice of the Regions which are being sold in this sale.
             */
            regionBegin: sts.number(),
            /**
             * The timeslice on which the Regions which are being sold in the sale terminate.
             * (i.e. One after the last timeslice which the Regions control.)
             */
            regionEnd: sts.number(),
            /**
             * The number of cores we want to sell, ideally. Selling this amount would result in
             * no change to the price for the next sale.
             */
            idealCoresSold: sts.number(),
            /**
             * Number of cores which are/have been offered for sale.
             */
            coresOffered: sts.number(),
        })
    ),
}

export const salesStarted =  {
    name: 'Broker.SalesStarted',
    /**
     * The sale rotation has been started and a new sale is imminent.
     */
    v268: new EventType(
        'Broker.SalesStarted',
        sts.struct({
            /**
             * The nominal price of an Region of Bulk Coretime.
             */
            price: sts.bigint(),
            /**
             * The maximum number of cores which this pallet will attempt to assign.
             */
            coreCount: sts.number(),
        })
    ),
}

export const historyInitialized =  {
    name: 'Broker.HistoryInitialized',
    /**
     * Some historical Instantaneous Core Pool payment record has been initialized.
     */
    v268: new EventType(
        'Broker.HistoryInitialized',
        sts.struct({
            /**
             * The timeslice whose history has been initialized.
             */
            when: sts.number(),
            /**
             * The amount of privately contributed Coretime to the Instantaneous Coretime Pool.
             */
            privatePoolSize: sts.number(),
            /**
             * The amount of Coretime contributed to the Instantaneous Coretime Pool by the
             * Polkadot System.
             */
            systemPoolSize: sts.number(),
        })
    ),
}
