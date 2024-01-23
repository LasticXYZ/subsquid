import { PalletId } from "../types/v268"


interface palletId {
    id: string
    palletId: typeof PalletId
}

interface timeslicePeriod {
    id: string
    timeslicePeriod: number
}

interface maxLeasedCores {
    id: string
    maxLeasedCores: number
}

interface maxReservedCores {
    id: string
    maxReservedCores: number
}

export {
    palletId,
    timeslicePeriod,
    maxLeasedCores,
    maxReservedCores
}
