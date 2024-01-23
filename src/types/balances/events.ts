import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v9430 from '../v9430'

export const transfer =  {
    name: 'Balances.Transfer',
    /**
     * Transfer succeeded.
     */
    v9430: new EventType(
        'Balances.Transfer',
        sts.struct({
            from: v9430.AccountId32,
            to: v9430.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
