import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from '../order/order.entity'

@Entity('Guest')
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  guest_id?: string
  @Column()
  name?: string
  @Column()
  lastname?: string
  @Column()
  email?: string

  @OneToMany(() => Order, (order) => order.guest)
  orderConnection?: Order[]
}
