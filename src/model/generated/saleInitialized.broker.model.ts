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

  @Column("text", {nullable: true})
  extrinsicHash!: string | undefined | null

  @Column("int")
  saleStart!: number

  @Column("int")
  leadinLength!: number

  @Column("bigint")
  startPrice!: bigint

  @Column("bigint")
  regularPrice!: bigint

  @Column("int")
  regionBegin!: number

  @Column("int")
  regionEnd!: number

  @Column("int")
  idealCoresSold!: number

  @Column("int")
  coresOffered!: number
}
