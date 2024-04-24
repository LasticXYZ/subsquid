import { DataHandlerContext } from '@subsquid/substrate-processor'
import { convertRegionId } from './createEntities/helper'
import { FindOptionsWhere } from 'typeorm'
import * as model from './model'
import {FindOneOptions, Store, TypeormDatabase} from '@subsquid/typeorm-store'
import {Fields, processor} from './processor'
import * as inter from './interfaces'

export async function createCoreOwnerEntities(
    ctx: DataHandlerContext<Store, Fields>,
    purchasedEvents: inter.PurchasedEvent[],
    transferredEvents: inter.TransferredEvent[],
    interlacedEvents: inter.InterlacedEvent[],
    partitionedEvents: inter.PartitionedEvent[],
    assignedEvents: inter.AssignedEvent[],
    pooledEvents: inter.PooledEvent[]
) {
    // Process purchased events and add them to the database
    const purchasedCores = purchasedEvents.map(event => createCoreOwnerFromEvent(event));
    await ctx.store.upsert(purchasedCores);

    // Process transferred events to update or add new CoreOwner entries
    for (const event of transferredEvents) {
        await processTransferredEvent(ctx, event);
    }

    // Process interlaced events to update or add new CoreOwner entries
    for (const event of interlacedEvents) {
        await processInterlacedEvent(ctx, event);
    }

    // Process partitioned events to update or add new CoreOwner entries
    for (const event of partitionedEvents) {
        await processPartitionedEvent(ctx, event);
    }

    for (const event of assignedEvents) {
        await processAssignedEvent(ctx, event);
    }

    for (const event of pooledEvents) {
        await processPooledEvent(ctx, event);
    }
}

function createCoreOwnerFromEvent(event: inter.PurchasedEvent): model.CoreOwner {
    return new model.CoreOwner({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        owner: event.who,
        regionId: convertRegionId(event.regionId),
        price: event.price,
        duration: event.duration,
        assigned: false,
        pooled: false
    });
}

async function processTransferredEvent(ctx: DataHandlerContext<Store, Fields>, event: inter.TransferredEvent) {
    const regionIdForModel = convertRegionId(event.regionId);

    const findOption: FindOptionsWhere<model.CoreOwner> = {
        owner: event.oldOwner,
        regionId: {
            begin: regionIdForModel.begin,
            core: regionIdForModel.core,
            mask: regionIdForModel.mask
        }
    };

    const existingCoreOwner = await ctx.store.findOne(model.CoreOwner, { where: findOption });

    if (existingCoreOwner) {
        // Update existing CoreOwner with new owner
        existingCoreOwner.timestamp = event.timestamp;
        existingCoreOwner.blockNumber = event.blockNumber;
        existingCoreOwner.owner = event.owner;
        await ctx.store.upsert(existingCoreOwner);
    } else {
        // Add new CoreOwner with updated owner
        const coreOwner = new model.CoreOwner({
            id: event.id,
            blockNumber: event.blockNumber,
            timestamp: event.timestamp,
            owner: event.owner,
            regionId: convertRegionId(event.regionId),
            price: null,   // transferred events don't have a price
            duration: event.duration,
            assigned: false,
            pooled: false
        });
        await ctx.store.upsert(coreOwner);
    }
}

async function processInterlacedEvent(ctx: DataHandlerContext<Store, Fields>, event: inter.InterlacedEvent) {
    const oldRegionIdForModel = convertRegionId(event.oldRegionId);

    const existingCoreRegionId = await ctx.store.findOne(
        model.CoreOwner, { where: {
            regionId: {
            begin: oldRegionIdForModel.begin,
            core: oldRegionIdForModel.core,
            mask: oldRegionIdForModel.mask
        }
      }}
    );

    console.log("Interlaced Event")
    console.log(existingCoreRegionId)

    if (existingCoreRegionId) {
        // Change one Region
        existingCoreRegionId.timestamp = event.timestamp;
        existingCoreRegionId.blockNumber = event.blockNumber;
        existingCoreRegionId.regionId = convertRegionId(event.newRegionIds[0]);
        
        // Add a new regionId with a new mask
        const coreOwner2 = new model.CoreOwner({
            id: event.id,
            blockNumber: event.blockNumber,
            timestamp: event.timestamp,
            owner: existingCoreRegionId.owner,
            regionId: convertRegionId(event.newRegionIds[1]),
            price: existingCoreRegionId.price,
            duration: existingCoreRegionId.duration,
            assigned: false,
            pooled: false
        });
        await ctx.store.upsert([existingCoreRegionId, coreOwner2]);
    }
}

async function processPartitionedEvent(ctx: DataHandlerContext<Store, Fields>, event: inter.PartitionedEvent) {
    const oldRegionIdForModel = convertRegionId(event.oldRegionId);

    const existingCoreRegionIdPart = await ctx.store.findOne(
        model.CoreOwner, { where: {
            regionId: {
                begin: oldRegionIdForModel.begin,
                core: oldRegionIdForModel.core,
                mask: oldRegionIdForModel.mask
            }
        }}
    );

    console.log("Partitioned Event")
    console.log(existingCoreRegionIdPart)

    if (existingCoreRegionIdPart) {
        const oldDuration = existingCoreRegionIdPart.duration;

        // Change one Region
        existingCoreRegionIdPart.timestamp = event.timestamp;
        existingCoreRegionIdPart.blockNumber = event.blockNumber;
        existingCoreRegionIdPart.regionId = convertRegionId(event.newRegionIds[0]);
        existingCoreRegionIdPart.duration = event.newRegionIds[1].begin - event.newRegionIds[0].begin;

        // Add a new regionId with the remaining duration
        const coreOwner2Part = new model.CoreOwner({
            id: event.id,
            blockNumber: event.blockNumber,
            timestamp: event.timestamp,
            owner: existingCoreRegionIdPart.owner,
            regionId: convertRegionId(event.newRegionIds[1]),
            price: existingCoreRegionIdPart.price,
            duration: oldDuration - (event.newRegionIds[1].begin - event.newRegionIds[0].begin),
            assigned: false,
            pooled: false
        });
        await ctx.store.upsert([existingCoreRegionIdPart, coreOwner2Part]);
    }
}

async function processAssignedEvent(ctx: DataHandlerContext<Store, Fields>, event: inter.AssignedEvent) {
    const regionIdForModel = convertRegionId(event.regionId);

    const findOption: FindOptionsWhere<model.CoreOwner> = {
        regionId: {
            begin: regionIdForModel.begin,
            core: regionIdForModel.core,
            mask: regionIdForModel.mask
        }
    };

    const existingCoreOwner = await ctx.store.findOne(model.CoreOwner, { where: findOption });

    if (existingCoreOwner) {
        // Update existing CoreOwner with new owner
        existingCoreOwner.timestamp = event.timestamp;
        existingCoreOwner.blockNumber = event.blockNumber;
        existingCoreOwner.duration = event.duration;
        existingCoreOwner.assigned = true;
        existingCoreOwner.task = event.task;
        await ctx.store.upsert(existingCoreOwner);
    }
}

async function processPooledEvent(ctx: DataHandlerContext<Store, Fields>, event: inter.PooledEvent) {
    const regionIdForModel = convertRegionId(event.regionId);

    const findOption: FindOptionsWhere<model.CoreOwner> = {
        regionId: {
            begin: regionIdForModel.begin,
            core: regionIdForModel.core,
            mask: regionIdForModel.mask
        }
    };

    const existingCoreOwner = await ctx.store.findOne(model.CoreOwner, { where: findOption });

    if (existingCoreOwner) {
        // Update existing CoreOwner with new owner
        existingCoreOwner.timestamp = event.timestamp;
        existingCoreOwner.blockNumber = event.blockNumber;
        existingCoreOwner.duration = event.duration;
        existingCoreOwner.pooled = true;
        await ctx.store.upsert(existingCoreOwner);
    }
}