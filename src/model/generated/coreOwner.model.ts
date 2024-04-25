import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {RegionId} from "./_regionId"

@Entity_()
export class CoreOwner {
    constructor(props?: Partial<CoreOwner>) {
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
    owner!: string

    // @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new RegionId(undefined, obj)}, nullable: false})
    // regionId!: RegionId

    @Column_("jsonb", {
        transformer: {
            to: (regionId: RegionId) => ({
                begin: regionId.begin,
                core: regionId.core,
                mask: regionId.mask
            }), 
            from: (json: any) => new RegionId(json)
        },
        nullable: false
    })
    regionId!: RegionId

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    price!: bigint | undefined | null

    @Column_("int4", {nullable: false})
    duration!: number

    @Index_()
    @Column_("bool", {nullable: false})
    pooled!: boolean

    @Index_()
    @Column_("bool", {nullable: false})
    assigned!: boolean

    @Column_("int4", {nullable: true})
    task!: number | undefined | null
}
