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

  @Column("int")
  when!: number

  @Column("int")
  privatePoolSize!: number

  @Column("int")
  systemPoolSize!: number
}
