import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class ClaimsReady {
    constructor(props?: Partial<ClaimsReady>) {
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
    when!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    systemPayout!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    privatePayout!: bigint
}
