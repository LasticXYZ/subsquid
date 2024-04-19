import {
    AsMultiExt
} from '../model'
import {
    AsMultiCall
} from '../interfaces'

import { convertTimepoint } from './multisigEvents';

function createAsMultiCallEntities(calls: AsMultiCall[]): AsMultiExt[] {
    return calls.map(call => new AsMultiExt({
        id: call.id,
        blockNumber: call.blockNumber,
        timestamp: call.timestamp,
        extrinsicHash: call.extrinsicHash,
        otherSignatories: call.otherSignatories,
        maybeTimepoint: convertTimepoint(call.maybeTimepoint),
        callHash: call.callHash,
    }));
}

export {
    createAsMultiCallEntities
}
