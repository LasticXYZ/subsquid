import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'
import * as v9430 from '../v9430'

export const palletId =  {
    /**
     *  Identifier from which the internal Pot is generated.
     */
    v9430: new ConstantType(
        'Broker.PalletId',
        v9430.PalletId
    ),
}

export const timeslicePeriod =  {
    /**
     *  Number of Relay-chain blocks per timeslice.
     */
    v9430: new ConstantType(
        'Broker.TimeslicePeriod',
        sts.number()
    ),
}

export const maxLeasedCores =  {
    /**
     *  Maximum number of legacy leases.
     */
    v9430: new ConstantType(
        'Broker.MaxLeasedCores',
        sts.number()
    ),
}

export const maxReservedCores =  {
    /**
     *  Maximum number of system cores.
     */
    v9430: new ConstantType(
        'Broker.MaxReservedCores',
        sts.number()
    ),
}
