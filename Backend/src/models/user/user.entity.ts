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
import { Review } from '../review/review.entity'

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
  @Column({ nullable: true })
  phone_nr?: string
  password?: string

  @OneToMany(() => Order, (order) => order.user)
  orderConnection?: Order[]

  @OneToMany(() => Review, (review) => review.user)
  reviewConnection?: Review[]

  @ManyToMany(() => Address, (address) => address.users, {
    cascade: true,
  })
  @JoinTable({ name: 'User_Address' })
  addresses?: Address[]
}
