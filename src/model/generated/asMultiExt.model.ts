import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Timepoint} from "./_timepoint"

@Entity_()
export class AsMultiExt {
    constructor(props?: Partial<AsMultiExt>) {
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

    @Column_("text", {array: true, nullable: false})
    otherSignatories!: (string)[]

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new Timepoint(undefined, obj)}, nullable: true})
    maybeTimepoint!: Timepoint | undefined | null

    @Index_()
    @Column_("text", {nullable: false})
    callHash!: string
}
