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
    assingedEvents: inter.CoreAssignedEvent[],
) {
    // Process purchased events and add them to the database
    const purchasedCores = purchasedEvents.map(event => new model.CoreOwner({
        id: event.id,
        blockNumber: event.blockNumber,
        timestamp: event.timestamp,
        owner: event.who,
        regionId: convertRegionId(event.regionId),
        price: event.price,
        duration: event.duration
    }));
    await ctx.store.upsert(purchasedCores);

    // Process transferred events to update or add new CoreOwner entries
    for (const event of transferredEvents) {
        const regionIdForModel = convertRegionId(event.regionId);

        const findOption: FindOptionsWhere<model.CoreOwner> | FindOptionsWhere<model.CoreOwner>[] = { 
            owner: event.oldOwner,
            regionId: {
                begin: regionIdForModel.begin,
                core: regionIdForModel.core,
                mask: regionIdForModel.mask
            }
        }
        const existingCoreOwner = await ctx.store.findOne(
            model.CoreOwner, { where: findOption}
        );

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
                price: null, // Assuming transferred events don't have a price
                duration: event.duration
            });
            await ctx.store.upsert(coreOwner);
        }
    }

    // Process interlaced events to update or add new CoreOwner entries
    for (const event of interlacedEvents) {
        const oldRegionIdForModel = convertRegionId(event.oldRegionId);
        console.log(event.oldRegionId)
        console.log(event.newRegionIds[0])
        console.log(event.newRegionIds[1])

        const findOption: FindOptionsWhere<model.CoreOwner> | FindOptionsWhere<model.CoreOwner>[] = { 
            regionId: {
                begin: oldRegionIdForModel.begin,
                core: oldRegionIdForModel.core,
                mask: oldRegionIdForModel.mask
            }
        }
        const existingCoreRegionId = await ctx.store.findOne(
            model.CoreOwner, { where: findOption}
        );

        console.log(existingCoreRegionId)

        if (existingCoreRegionId) {
            // Remove the previous CoreOwner Region
            await ctx.store.remove(existingCoreRegionId);

            // Add 2 new CoreOwners with updated regionId
            const coreOwner1 = new model.CoreOwner({
                id: existingCoreRegionId.id,
                blockNumber: event.blockNumber,
                timestamp: event.timestamp,
                owner: existingCoreRegionId.owner,
                regionId: convertRegionId(event.newRegionIds[0]),
                price: existingCoreRegionId.price,
                duration: existingCoreRegionId.duration
            });
            const coreOwner2 = new model.CoreOwner({
                id: event.id,
                blockNumber: event.blockNumber,
                timestamp: event.timestamp,
                owner: existingCoreRegionId.owner,
                regionId: convertRegionId(event.newRegionIds[1]),
                price: existingCoreRegionId.price,
                duration: existingCoreRegionId.duration
            });
            await ctx.store.upsert([coreOwner1, coreOwner2]);

        }
    }

    // Process partitioned events to update or add new CoreOwner entries
    for (const event of partitionedEvents) {
        const oldRegionIdForModel = convertRegionId(event.oldRegionId);

        console.log(event.oldRegionId)
        console.log(event.newRegionIds[0])
        console.log(event.newRegionIds[1])

        const findOption: FindOptionsWhere<model.CoreOwner> | FindOptionsWhere<model.CoreOwner>[] = { 
            regionId: {
                begin: oldRegionIdForModel.begin,
                core: oldRegionIdForModel.core,
                mask: oldRegionIdForModel.mask
            }
        }
        const existingCoreRegionId = await ctx.store.findOne(
            model.CoreOwner, { where: findOption}
        );

        console.log(existingCoreRegionId)


        if (existingCoreRegionId) {
            // Remove the previous CoreOwner Region
            await ctx.store.remove(existingCoreRegionId);

            // Add 2 new CoreOwners with updated regionId
            const coreOwner1 = new model.CoreOwner({
                id: existingCoreRegionId.id,
                blockNumber: event.blockNumber,
                timestamp: event.timestamp,
                owner: existingCoreRegionId.owner,
                regionId: convertRegionId(event.newRegionIds[0]),
                price: existingCoreRegionId.price,
                duration: event.newRegionIds[1].begin - event.newRegionIds[0].begin
            });
            const coreOwner2 = new model.CoreOwner({
                id: event.id,
                blockNumber: event.blockNumber,
                timestamp: event.timestamp,
                owner: existingCoreRegionId.owner,
                regionId: convertRegionId(event.newRegionIds[1]),
                price: existingCoreRegionId.price,
                duration: 1260 - (event.newRegionIds[1].begin - event.newRegionIds[0].begin)
            });
            await ctx.store.upsert([coreOwner1, coreOwner2]);

        }
    }

}