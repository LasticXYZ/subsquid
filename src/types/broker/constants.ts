import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'
import * as coretimeRococoV9430 from '../coretimeRococoV9430'

export const palletId =  {
    /**
     *  Identifier from which the internal Pot is generated.
     */
    coretimeRococoV9430: new ConstantType(
        'Broker.PalletId',
        coretimeRococoV9430.PalletId
    ),
}

export const timeslicePeriod =  {
    /**
     *  Number of Relay-chain blocks per timeslice.
     */
    coretimeRococoV9430: new ConstantType(
        'Broker.TimeslicePeriod',
        sts.number()
    ),
}

export const maxLeasedCores =  {
    /**
     *  Maximum number of legacy leases.
     */
    coretimeRococoV9430: new ConstantType(
        'Broker.MaxLeasedCores',
        sts.number()
    ),
}

export const maxReservedCores =  {
    /**
     *  Maximum number of system cores.
     */
    coretimeRococoV9430: new ConstantType(
        'Broker.MaxReservedCores',
        sts.number()
    ),
}
