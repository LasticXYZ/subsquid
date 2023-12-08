import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {CoreAssignmentTuple} from "./_coreAssignmentTuple"

@Entity_()
export class CoreAssigned {
    constructor(props?: Partial<CoreAssigned>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    blockNumber!: number

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("int4", {nullable: false})
    core!: number

    @Column_("int4", {nullable: false})
    when!: number

    @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new CoreAssignmentTuple(undefined, marshal.nonNull(val)))}, nullable: false})
    assignment!: (CoreAssignmentTuple)[]
}
