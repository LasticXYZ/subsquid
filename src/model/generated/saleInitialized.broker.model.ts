import {Entity, Column, PrimaryColumn} from "typeorm"

@Entity()
export class SaleInitialized {
  constructor(props?: Partial<SaleInitialized>) {
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
  saleStart!: bigint

  @Column("int")
  leadinLength!: number

  @Column("bigint")
  startPrice!: bigint

  @Column("bigint")
  regularPrice!: bigint

  @Column("bigint")
  regionBegin!: bigint

  @Column("bigint")
  regionEnd!: bigint

  @Column("int")
  idealCoresSold!: number

  @Column("int")
  coresOffered!: number
}
