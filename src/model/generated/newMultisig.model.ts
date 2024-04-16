import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

@Entity_()
export class NewMultisig {
    constructor(props?: Partial<NewMultisig>) {
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

    @Index_()
    @Column_("text", {nullable: false})
    multisig!: string

    @Index_()
    @Column_("text", {nullable: true})
    callHash!: string | undefined | null
}
