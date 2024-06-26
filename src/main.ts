import {TypeormDatabase} from '@subsquid/typeorm-store'

import {Fields, processor} from './processor'
import * as inter from './interfaces'

import { brokerEventFetchers, multisigEventFetchers } from './getEvents'

import {brokerCallFetchers} from './getCalls'

import { entityBrokerEventCreators, entityBrokerCallCreators, entityMultisigEventCreators } from './createEntities'
import { createCoreOwnerEntities } from './coreOwnerEntities'

interface EntityCreationMap {
    [key: string]: (items: any[]) => any[];
}

// Utility function to fetch events and calls dynamically
function fetchAll<T>(fetchFunctionMap: { [key: string]: (ctx: any) => T[] }, ctx: any): { [key: string]: T[] } {
    return Object.keys(fetchFunctionMap).reduce((acc, key) => {
        acc[key] = fetchFunctionMap[key](ctx);
        return acc;
    }, {} as { [key: string]: T[] });
}


// Generic function to create entities
function createEntities<T, U>(entityMap: EntityCreationMap, dataMap: { [key: string]: T[] }): U[] {
    return Object.keys(entityMap).flatMap(key => {
        if (!dataMap[key]) {
            //console.error(`No data available for key: ${key}`);
            return []; // Return empty array if no data to avoid errors
        }
        return entityMap[key](dataMap[key]);
    });
}


// Function to perform batch insertion
async function batchInsert(ctx: any, ...entitiesArray: any[][]) {
    const groupedEntities = new Map<Function, any[]>();

    // Group entities by their constructor to ensure type uniformity
    for (const entities of entitiesArray) {
        for (const entity of entities) {
            const constructor = entity.constructor;
            if (!groupedEntities.has(constructor)) {
                groupedEntities.set(constructor, []);
            }
            groupedEntities.get(constructor)?.push(entity);
        }
    }

    // Insert groups of entities by type
    for (const [constructor, entities] of groupedEntities) {
        await ctx.store.insert(entities);
    }
}


processor.run(new TypeormDatabase({supportHotBlocks: false}), async (ctx) => {

    const allBrokerEvents = fetchAll(brokerEventFetchers, ctx);
    const allMultisigEvents = fetchAll(multisigEventFetchers, ctx);
    const allBrokerCalls = fetchAll(brokerCallFetchers, ctx);

    const eventBrokerEntities = createEntities(entityBrokerEventCreators, allBrokerEvents);
    const eventMultisigEntities = createEntities(entityMultisigEventCreators, allMultisigEvents);
    const callBrokerEntities = createEntities(entityBrokerCallCreators, allBrokerCalls); // Adjust as needed

    createCoreOwnerEntities(
        ctx,
        allBrokerEvents.purchased as inter.PurchasedEvent[],
        allBrokerEvents.transferred as inter.TransferredEvent[],
        allBrokerEvents.interlaced as inter.InterlacedEvent[],
        allBrokerEvents.partitioned as inter.PartitionedEvent[],
        allBrokerEvents.assigned as inter.AssignedEvent[],
        allBrokerEvents.pooled as inter.PooledEvent[]
    )

    // Perform batch insertions
    await batchInsert(ctx, eventBrokerEntities);
    await batchInsert(ctx, eventMultisigEntities);
    await batchInsert(ctx, callBrokerEntities);
})
