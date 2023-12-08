import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class HistoryInitialized {
    constructor(props?: Partial<HistoryInitialized>) {
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
    @Column_("text", {nullable: true})
    extrinsicHash!: string | undefined | null

    @Column_("int4", {nullable: false})
    when!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    privatePoolSize!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    systemPoolSize!: bigint
}
