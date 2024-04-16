import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Timepoint} from "./_timepoint"

@Entity_()
export class MultisigCancelled {
    constructor(props?: Partial<MultisigCancelled>) {
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
    cancelling!: string

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new Timepoint(undefined, obj)}, nullable: false})
    timepoint!: Timepoint

    @Index_()
    @Column_("text", {nullable: false})
    multisig!: string

    @Index_()
    @Column_("text", {nullable: true})
    callHash!: string | undefined | null
}
