import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v268 from '../v268'

export const transfer =  {
    name: 'Balances.Transfer',
    /**
     * Transfer succeeded.
     */
    v268: new EventType(
        'Balances.Transfer',
        sts.struct({
            from: v268.AccountId32,
            to: v268.AccountId32,
            amount: sts.bigint(),
        })
    ),
}
