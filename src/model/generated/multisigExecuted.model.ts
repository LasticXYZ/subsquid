import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Timepoint} from "./_timepoint"
import {ResultType} from "./_resultType"

@Entity_()
export class MultisigExecuted {
    constructor(props?: Partial<MultisigExecuted>) {
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
    approving!: string

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new Timepoint(undefined, obj)}, nullable: false})
    timepoint!: Timepoint

    @Index_()
    @Column_("text", {nullable: false})
    multisig!: string

    @Index_()
    @Column_("text", {nullable: true})
    callHash!: string | undefined | null

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new ResultType(undefined, obj)}, nullable: false})
    result!: ResultType
}
