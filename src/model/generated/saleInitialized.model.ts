import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class SaleInitialized {
    constructor(props?: Partial<SaleInitialized>) {
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

    @Index_()
    @Column_("text", {nullable: false})
    extrinsicHash!: string

    @Column_("int4", {nullable: false})
    saleStart!: number

    @Column_("int4", {nullable: false})
    leadinLength!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    startPrice!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    regularPrice!: bigint

    @Column_("int4", {nullable: false})
    regionBegin!: number

    @Column_("int4", {nullable: false})
    regionEnd!: number

    @Column_("int4", {nullable: false})
    idealCoresSold!: number

    @Column_("int4", {nullable: false})
    coresOffered!: number
}
