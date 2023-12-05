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

  @Column()
  extrinsicHash!: string

  @Column("bigint")
  price!: bigint

  @Column("int")
  coreCount!: number
}
