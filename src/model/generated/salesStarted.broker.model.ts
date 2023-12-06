import {Entity, Column, PrimaryColumn} from "typeorm"

@Entity()
export class SalesStarted {
  constructor(props?: Partial<SalesStarted>) {
    Object.assign(this, props)
  }

  @PrimaryColumn()
  id!: string

  @Column("int")
  blockNumber!: number

  @Column("timestamp")
  timestamp!: Date

  @Column("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Column("bigint")
  price!: bigint

  @Column("int")
  coreCount!: number
}
