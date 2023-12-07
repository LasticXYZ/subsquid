import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {RegionId} from "./_regionId"
import {RegionIdPair} from "./_regionIdPair"

@Entity_()
export class Partitioned {
    constructor(props?: Partial<Partitioned>) {
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

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new RegionId(undefined, obj)}, nullable: false})
    oldRegionId!: RegionId

    @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new RegionIdPair(undefined, marshal.nonNull(val)))}, nullable: false})
    newRegionIds!: (RegionIdPair)[]
}
