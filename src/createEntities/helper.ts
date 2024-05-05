import {RegionId as RegionIdForModel} from '../model/generated/_regionId'
import {ScheduleItem as ScheduleItemModel} from '../model/generated/_scheduleItem'
import {CoreAssignment as CoreAssignmentModel} from '../model/generated/_coreAssignment'
import {CoreAssignmentKind} from "../model/generated/_coreAssignmentKind"
import {CoreAssignmentTuple as CoreAssignmentTupleModel} from '../model/generated/_coreAssignmentTuple'
import {RegionIdPair as RegionIdPairModel} from '../model/generated/_regionIdPair'
import {
    RegionId as RegionIdFromEvent,
    ScheduleItem as ScheduleItemEvent,
    CoreAssignment as CoreAssignmentEvent,
    ConfigRecord as ConfigRecordCall,
} from '../types/rococo/v9430'
import { ConfigRecord } from '../model'


function convertRegionId(regionId: RegionIdFromEvent): RegionIdForModel {
    return new RegionIdForModel({
        begin: regionId.begin,
        core: regionId.core,
        mask: regionId.mask
    });
}

function transformCoreAssignment(assignment: CoreAssignmentEvent): CoreAssignmentModel {

    let kind: CoreAssignmentKind;
    let value: number | null = null;

    switch (assignment.__kind) {
        case 'Idle':
            kind = CoreAssignmentKind.Idle;
            break;
        case 'Pool':
            kind = CoreAssignmentKind.Pool;
            break;
        case 'Task':
            kind = CoreAssignmentKind.Task;
            value = assignment.value;
            break;
        default:
            throw new Error('Unknown CoreAssignment kind');
    }

    return new CoreAssignmentModel({ kind, value });

}

function transformScheduleItem(scheduledItem: ScheduleItemEvent): ScheduleItemModel {
    return new ScheduleItemModel({
        mask: scheduledItem.mask,
        assignment: scheduledItem.assignment ? transformCoreAssignment(scheduledItem.assignment) : undefined,
    });
}

function transformCoreAssignments(assignments: [CoreAssignmentEvent, number][]): CoreAssignmentTupleModel[] {
    return assignments.map(([assignment, value]) => {
        return new CoreAssignmentTupleModel({
            assignment: transformCoreAssignment(assignment),
            value: value
        });
    });
}

function convertRegionIds(regionIds: [RegionIdFromEvent, RegionIdFromEvent]): RegionIdPairModel {
    return new RegionIdPairModel({
        first: convertRegionId(regionIds[0]),
        second: convertRegionId(regionIds[1])
    });
}

function convertConfigureRecord(config_recod: ConfigRecordCall): ConfigRecord {
    return new ConfigRecord({
        advanceNotice: config_recod.advanceNotice,
        interludeLength: config_recod.interludeLength,
        leadinLength: config_recod.leadinLength,
        regionLength: config_recod.regionLength,
        idealBulkProportion: config_recod.idealBulkProportion,
        limitCoresOffered: config_recod.limitCoresOffered,
        renewalBump: config_recod.renewalBump,
        contributionTimeout: config_recod.contributionTimeout,
    });
}


export {
    convertRegionId,
    transformCoreAssignment,
    transformScheduleItem,
    transformCoreAssignments,
    convertRegionIds,
    convertConfigureRecord,
}