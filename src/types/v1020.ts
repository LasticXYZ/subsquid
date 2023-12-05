import {sts, Result, Option, Bytes, BitSequence} from './support'

export const Balance = sts.bigint()

export const AccountId = sts.bytes()

export const DispatchError: sts.Type<DispatchError> = sts.struct(() => {
    return  {
        module: sts.option(() => sts.number()),
        error: sts.number(),
    }
})

export interface DispatchError {
    module?: (number | undefined)
    error: number
}

export const DispatchInfo: sts.Type<DispatchInfo> = sts.struct(() => {
    return  {
        weight: Weight,
        class: DispatchClass,
        paysFee: sts.boolean(),
    }
})

export const DispatchClass: sts.Type<DispatchClass> = sts.closedEnum(() => {
    return  {
        Mandatory: sts.unit(),
        Normal: sts.unit(),
        Operational: sts.unit(),
    }
})

export type DispatchClass = DispatchClass_Mandatory | DispatchClass_Normal | DispatchClass_Operational

export interface DispatchClass_Mandatory {
    __kind: 'Mandatory'
}

export interface DispatchClass_Normal {
    __kind: 'Normal'
}

export interface DispatchClass_Operational {
    __kind: 'Operational'
}

export const Weight = sts.number()

export interface DispatchInfo {
    weight: Weight
    class: DispatchClass
    paysFee: boolean
}

export type Weight = number
