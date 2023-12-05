import { sts, EventType } from '../support'
import * as v1020 from '../v1020'
import * as v1050 from '../v1050'
import * as v9130 from '../v9130'

// Define the structure for HistoryInitialized event for different versions
export const historyInitialized = {
    name: 'Broker.HistoryInitialized',
    v1020: new EventType(
        'Broker.HistoryInitialized',
        sts.tuple([v1020.AccountId, v1020.AccountId, v1020.Balance, v1020.Balance])
    ),
}

// Define the structure for SaleInitialized event for different versions
export const saleInitialized = {
    name: 'Broker.SaleInitialized',
    // Add versions as per your event structure
    v1020: new EventType(
        'Broker.SaleInitialized',
        sts.tuple([v1050.AccountId, v1050.AccountId, v1050.Balance])

    ),
}

// Define the structure for SalesStarted event for different versions
export const salesStarted = {
    name: 'Broker.SalesStarted',
    // Add versions as per your event structure
    v1020: new EventType(
        'Broker.SalesStarted',
        sts.tuple([v1050.AccountId, v1050.AccountId, v1050.Balance])
    ),
}
