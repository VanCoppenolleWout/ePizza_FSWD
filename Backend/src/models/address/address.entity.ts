import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from '../order/order.entity'
import { User } from '../user/user.entity'

@Entity('Address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  address_id?: string
  @Column({ length: 250 })
  street?: string
  @Column()
  number?: string
  @Column()
  city?: string
  @Column({ nullable: true })
  state?: string
  @Column()
  postal_code?: string
  @Column({ nullable: true })
  country?: string

  @ManyToMany(() => User, (user) => user.addresses)
  users?: User[]

  @OneToMany(() => Order, (order) => order.address)
  orderConnection?: Order[]
}
