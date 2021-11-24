import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Address } from '../address/address.entity'
import { Order } from '../order/order.entity'

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id?: string
  @Column()
  name?: string
  @Column()
  lastname?: string
  @Column()
  email?: string
  @Column()
  phone_nr?: string
  password?: string

  @OneToMany(() => Order, (order) => order.user)
  orderConnection?: Order[]

  @OneToMany(() => Order, (review) => review.user)
  reviewConnection?: Order[]

  @ManyToMany(() => Address, (address) => address.users, {
    cascade: true,
  })
  @JoinTable({ name: 'User_Address' })
  addresses?: Address[]
}
