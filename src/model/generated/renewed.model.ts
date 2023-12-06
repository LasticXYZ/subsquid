import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {ScheduleItem} from "./_scheduleItem"

@Entity_()
export class Renewed {
    constructor(props?: Partial<Renewed>) {
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

    @Column_("text", {nullable: false})
    who!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price!: bigint

    @Column_("int4", {nullable: false})
    oldCore!: number

    @Column_("int4", {nullable: false})
    core!: number

    @Column_("int4", {nullable: false})
    begin!: number

    @Column_("int4", {nullable: false})
    duration!: number

    @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new ScheduleItem(undefined, marshal.nonNull(val)))}, nullable: false})
    workload!: (ScheduleItem)[]
}
