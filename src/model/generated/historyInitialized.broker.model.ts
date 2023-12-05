import {Entity, Column, PrimaryColumn} from "typeorm"

@Entity()
export class HistoryInitialized {
  constructor(props?: Partial<HistoryInitialized>) {
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
  when!: bigint

  @Column("bigint")
  privatePoolSize!: bigint

  @Column("bigint")
  systemPoolSize!: bigint
}
