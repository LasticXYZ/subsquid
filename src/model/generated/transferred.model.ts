import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {RegionId} from "./_regionId"

@Entity_()
export class Transferred {
    constructor(props?: Partial<Transferred>) {
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
    regionId!: RegionId

    @Column_("int4", {nullable: false})
    duration!: number

    @Column_("text", {nullable: true})
    oldOwner!: string | undefined | null

    @Column_("text", {nullable: true})
    owner!: string | undefined | null
}
