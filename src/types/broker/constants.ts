import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'
import * as v268 from '../v268'

export const palletId =  {
    /**
     *  Identifier from which the internal Pot is generated.
     */
    v268: new ConstantType(
        'Broker.PalletId',
        v268.PalletId
    ),
}

export const timeslicePeriod =  {
    /**
     *  Number of Relay-chain blocks per timeslice.
     */
    v268: new ConstantType(
        'Broker.TimeslicePeriod',
        sts.number()
    ),
}

export const maxLeasedCores =  {
    /**
     *  Maximum number of legacy leases.
     */
    v268: new ConstantType(
        'Broker.MaxLeasedCores',
        sts.number()
    ),
}

export const maxReservedCores =  {
    /**
     *  Maximum number of system cores.
     */
    v268: new ConstantType(
        'Broker.MaxReservedCores',
        sts.number()
    ),
}
