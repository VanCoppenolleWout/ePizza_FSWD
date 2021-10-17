import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Address } from '../address/address.entity'
import { Order } from '../order/order.entity'
import { UserAddress } from '../useraddress/useraddress.entity'

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id?: string
  @Column()
  name?: string
  @Column()
  surname?: string
  @Column()
  email?: string
  @Column()
  birthdate?: Date
  @Column()
  phone_nr?: string
  @Column()
  @Exclude()
  password?: string

  @OneToMany(() => Order, (order) => order.userConnection)
  orderConnection?: Order[]

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addressConnection?: Address[]
}