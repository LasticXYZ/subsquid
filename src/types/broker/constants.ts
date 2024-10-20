import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'
import * as v1003000 from '../v1003000'

export const palletId =  {
    /**
     *  Identifier from which the internal Pot is generated.
     */
    v1003000: new ConstantType(
        'Broker.PalletId',
        v1003000.PalletId
    ),
}

export const timeslicePeriod =  {
    /**
     *  Number of Relay-chain blocks per timeslice.
     */
    v1003000: new ConstantType(
        'Broker.TimeslicePeriod',
        sts.number()
    ),
}

export const maxLeasedCores =  {
    /**
     *  Maximum number of legacy leases.
     */
    v1003000: new ConstantType(
        'Broker.MaxLeasedCores',
        sts.number()
    ),
}

export const maxReservedCores =  {
    /**
     *  Maximum number of system cores.
     */
    v1003000: new ConstantType(
        'Broker.MaxReservedCores',
        sts.number()
    ),
}
