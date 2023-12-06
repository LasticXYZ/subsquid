import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

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

    @Column_("int4", {nullable: false})
    regionId!: number

    @Column_("int4", {nullable: false})
    duration!: number

    @Column_("text", {nullable: false})
    oldOwner!: string

    @Column_("text", {nullable: false})
    owner!: string
}
